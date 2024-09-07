import React, { useRef, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { setupUrlUpdater } from "../utils/urlUpdater";
import InsertTooltip from "./InsertTooltip";

interface InsertButtonProps {
  test?: boolean;
}

const InsertButton: React.FC<InsertButtonProps> = ({ test = false }) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [queryLink, setQueryLink] = useState<string>("");
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const shadow = buttonRef.current.attachShadow({ mode: "open" });

      // Fetch and inject styles
      fetch(chrome.runtime.getURL("css/styles.css"))
        .then((response) => response.text())
        .then((css) => {
          const style = document.createElement("style");
          style.textContent = css;
          shadow.appendChild(style);

          const link = document.createElement("a");
          link.className = "trieve-button";

          const img = document.createElement("img");
          img.id = "trieve-logo";
          img.src = chrome.runtime.getURL("images/trieve_logo_128.png");
          img.alt = "Trieve Logo";
          img.style.width = "1.4em";
          img.style.height = "1.4em";
          img.style.objectFit = "contain";
          img.style.marginRight = "0.5em";
          link.appendChild(img);

          const text = document.createTextNode("Try it with Trieve!");
          link.appendChild(text);

          shadow.appendChild(link);

          const tooltipContainer = document.createElement("div");
          tooltipContainer.className = "tooltip-container";
          shadow.appendChild(tooltipContainer);

          const cleanup = setupUrlUpdater(link, setQueryLink);

          let enterTimeout: NodeJS.Timeout;
          let leaveTimeout: NodeJS.Timeout;

          link.addEventListener("mouseenter", () => {
            clearTimeout(leaveTimeout);
            enterTimeout = setTimeout(() => setShowTooltip(true), 500);
          });

          link.addEventListener("mouseleave", () => {
            clearTimeout(enterTimeout);
            leaveTimeout = setTimeout(() => setShowTooltip(false), 500);
          });

          return () => {
            cleanup();
            link.removeEventListener("mouseenter", () => setShowTooltip(true));
            link.removeEventListener("mouseleave", () => setShowTooltip(false));
          };
        })
        .catch((error) => console.error("Error loading styles:", error));
    }
  }, []);

  useEffect(() => {
    if (buttonRef.current?.shadowRoot) {
      const tooltipContainer =
        buttonRef.current.shadowRoot.querySelector(".tooltip-container");
      if (tooltipContainer) {
        const root = createRoot(tooltipContainer);
        root.render(
          showTooltip && queryLink ? (
            <InsertTooltip queryLink={queryLink} />
          ) : null
        );
      }
    }
  }, [showTooltip, queryLink]);

  return (
    <>
      <div ref={buttonRef}></div>
      {test && queryLink && (
        <div
          className="query-link"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#f0f0f0",
            padding: "10px",
            zIndex: 9999,
            textAlign: "center",
          }}
        >
          Query Link: {queryLink}
        </div>
      )}
    </>
  );
};

export default InsertButton;
