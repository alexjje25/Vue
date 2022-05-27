<template>
  <button id="toggle-vue-debug" type="button" class="btn btn-primary btn-lg">
    DEBUGGER VUE
  </button>
</template>

<script>
export default {
  mounted() {
    window.CustomVueDebug = (function(window, document) {
      // Configurable options
      let autoInjectButton = false, // If enable a trigger button will be automatically injected
        breadcrumbLength = 1, // Number of parent's names to concatenate in the tooltip
        buttonSelector = "#toggle-vue-debug", // Customise the selector to find the existing button
        removeReferences = false; // If true, the global refs will be removed after disable

      // Debugger code
      let button = document.querySelector(buttonSelector),
        components = [],
        enabled = false,
        referenceCount = 0;

      function buildBreadcrumb(component) {
        let level = component,
          crumbs = [];

        do {
          crumbs.push(level.$options.name || "unknown");

          level = level.$parent;
        } while (level && crumbs.length < breadcrumbLength);

        return crumbs.reverse().join(" > ");
      }

      function positionTooltip(rect) {
        // Center tooltip
        rect.x -= rect.w / 2;
        rect.y -= rect.h;

        // Keep tooltip within window bounds
        rect.x = Math.max(Math.min(rect.x, window.innerWidth - rect.w), 0);
        rect.y = Math.max(Math.min(rect.y, window.innerHeight - rect.h), 0);

        return rect;
      }

      function createTooltipElement(element, text) {
        let rect = element.getBoundingClientRect(),
          tooltip = document.createElement("div");

        tooltip.innerHTML = text;

        document.body.appendChild(tooltip);

        style(tooltip, {
          background: "black",
          color: "white",
          position: "fixed",
          zIndex: 999999,
          display: "block",
          padding: "6px 10px",
          maxWidth: "200px"
        });

        rect = positionTooltip({
          w: tooltip.offsetWidth,
          h: tooltip.offsetHeight,
          x: rect.x + element.offsetWidth / 2,
          y: rect.y
        });

        style(tooltip, {
          // width: rect.w + 'px',
          // height: rect.h + 'px',
          left: rect.x + "px",
          top: rect.y + "px"
        });

        return tooltip;
      }

      function hideTooltip(element) {
        if (element.__tooltip) {
          document.body.removeChild(element.__tooltip);

          delete element.__tooltip;
        }
      }

      function showTooltip(element, text) {
        hideTooltip(element);

        element.__tooltip = createTooltipElement(element, text);
      }

      function restoreStyle(element, prop = "__originalStyle") {
        if (element[prop]) {
          style(element, element[prop]);

          element[prop] = null;
        }
      }

      function tempStyle(element, styles, prop = "__originalStyle") {
        // In case of double temp style
        restoreStyle(element, prop);

        let original = {};

        for (let prop in styles) {
          original[prop] = element.style[prop];
        }

        style(element, styles);

        element[prop] = original;
      }

      function highlightElement(element) {
        let component = element.__vue__;

        if (!component) {
          return;
        }

        unhighlightParents(component);

        tempStyle(element, {
          outline: "4px solid red",
          backgroundColor: "red"
        });

        showTooltip(element, buildBreadcrumb(component));
      }

      function unhighlightElement(element) {
        let component = element.__vue__;

        if (!component) {
          return;
        }

        restoreStyle(element);

        hideTooltip(element);
      }

      function unhighlightParents(component) {
        let level = component;

        while ((level = level.$parent)) {
          unhighlightElement(level.$el);
        }
      }

      function onComponentMouseEnter(event) {
        event.stopPropagation();

        highlightElement(event.currentTarget);
      }

      function onComponentMouseLeave(event) {
        event.stopPropagation();

        unhighlightElement(event.currentTarget);
      }

      function addGlobalReference(event) {
        let element = event.currentTarget;

        window["$vm" + referenceCount] = element.__vue__;

        console.log(
          "Added global reference for <" +
            element.__vue__.$options.name +
            ">: " +
            "$vm" +
            referenceCount
        );

        ++referenceCount;

        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
      }

      function unhighlightButton() {
        if (autoInjectButton) {
          style(button, {
            background: "black"
          });
        } else {
          button.classList.remove("btn-success");
          button.classList.add("btn-primary");
        }
      }

      function highlightButton() {
        if (autoInjectButton) {
          style(button, {
            background: "green"
          });
        } else {
          button.classList.remove("btn-primary");
          button.classList.add("btn-success");
        }
      }

      function enableVueDebug() {
        let elements = document.querySelectorAll("*"),
          length = elements.length;

        for (let index = 0; index < length; ++index) {
          let element = elements[index];

          if (element.__vue__) {
            element.addEventListener("mouseover", onComponentMouseEnter);
            element.addEventListener("mouseout", onComponentMouseLeave);
            element.addEventListener("click", addGlobalReference);

            tempStyle(
              element,
              {
                paddingTop: "4px",
                paddingBottom: "4px",
                outline: "1px solid rgba(0, 0, 0, 0.5)"
              },
              "__initStyle"
            );

            components.push(element);
          }
        }

        enabled = true;

        highlightButton();
      }

      function disableVueDebug() {
        for (let component of components) {
          component.removeEventListener("mouseover", onComponentMouseEnter);
          component.removeEventListener("mouseout", onComponentMouseLeave);
          component.removeEventListener("click", addGlobalReference);

          restoreStyle(component, "__initStyle");
        }

        components = [];

        if (removeReferences) {
          for (let index = 0; index < referenceCount; ++index) {
            delete window["$vm" + index];
          }
        }

        // Reference count is still reset to 0 regardless, so that next round of clicks on consecutive enable overwrite
        // the previously set refs if they were not removed.
        referenceCount = 0;

        unhighlightButton();
      }

      function toggleDebug() {
        (enabled = !enabled) ? enableVueDebug() : disableVueDebug();
      }

      function style(element, styles) {
        Object.assign(element.style, styles);
      }

      function createButton() {
        let button = document.createElement("div");

        style(button, {
          cursor: "pointer",
          background: "black",
          color: "white",
          fontWeight: "bold",
          fontFamily: "monospace",
          opacity: 0.8,
          position: "fixed",
          bottom: 0,
          left: 0,
          padding: "10px 15px",
          zIndex: 1000000
        });

        button.textContent = "V";

        document.body.appendChild(button);

        button.addEventListener(
          "mouseenter",
          event => (event.currentTarget.style.opacity = 1)
        );
        button.addEventListener(
          "mouseleave",
          event => (event.currentTarget.style.opacity = 0.8)
        );

        return button;
      }

      if (!button && autoInjectButton) {
        button = createButton();
      }

      if (button) {
        button.addEventListener("click", toggleDebug);
      }

      return {
        enable: enableVueDebug,
        disable: disableVueDebug
      };
    })(window, document);
  }
};
</script>

<style></style>
