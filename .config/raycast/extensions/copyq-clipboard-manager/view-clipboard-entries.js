"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/view-clipboard-entries.tsx
var view_clipboard_entries_exports = {};
__export(view_clipboard_entries_exports, {
  default: () => Command
});
module.exports = __toCommonJS(view_clipboard_entries_exports);
var import_api = require("@raycast/api");
var import_react = require("react");
var import_child_process = require("child_process");
var import_jsx_runtime = require("react/jsx-runtime");
function Command() {
  const { default_tab } = (0, import_api.getPreferenceValues)();
  const copyQPath = "/Applications/CopyQ.app/Contents/MacOS/CopyQ";
  try {
    (0, import_child_process.execSync)(`${copyQPath} tab`, { encoding: "utf8" });
  } catch (err) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_api.Detail,
      {
        markdown: "CopyQ not found, or CopyQ server not running\n\nPlease check that CopyQ is installed properly, and make sure CopyQ server is running.",
        actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.ActionPanel, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action, { title: "Open Command Preferences", icon: import_api.Icon.Cog, onAction: import_api.openExtensionPreferences }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action.Paste, { title: "Copy Path to Clipboard", content: copyQPath })
        ] })
      }
    );
  }
  const [selectedTab, setSelectedTab] = (0, import_react.useState)(default_tab);
  const [clipboardContents, setClipboardContents] = (0, import_react.useState)([]);
  function getTabs() {
    const command = `"${copyQPath}" tab`;
    const stdout = (0, import_child_process.execSync)(command, { encoding: "utf8" });
    const lines = stdout.split("\n");
    const formattedList = lines.filter((line) => line.trim() !== "");
    const cleanedList = formattedList.map((item) => item.replace("&", ""));
    return cleanedList;
  }
  function TabDropdown() {
    const tabs = getTabs();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_api.List.Dropdown,
      {
        tooltip: "Select a Tab",
        defaultValue: default_tab,
        storeValue: false,
        placeholder: "Search Tabs",
        onChange: (newTab) => setSelectedTab(newTab),
        children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List.Dropdown.Item, { title: tab, value: tab }, tab))
      }
    );
  }
  function getClipboardContents(tab) {
    const command = `${copyQPath} tab ${tab} 'separator(String.fromCharCode(0)); read.apply(this, [...Array(size()).keys()])'`;
    const stdout = (0, import_child_process.execSync)(command, { encoding: "utf8", stdio: "ignore" });
    return stdout.split("\0");
  }
  function selectClipboardContents(tab, index) {
    const command = `${copyQPath} tab ${tab} select ${index}`;
    (0, import_child_process.execSync)(command);
  }
  (0, import_react.useEffect)(() => {
    const newClipboardContents = getClipboardContents(selectedTab);
    setClipboardContents(newClipboardContents);
  }, [selectedTab]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_api.List,
    {
      navigationTitle: "Clipboard Manager",
      searchBarPlaceholder: "Search Clipboard Contents",
      searchBarAccessory: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabDropdown, {}),
      isShowingDetail: true,
      children: clipboardContents.map((text, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_api.List.Item,
        {
          title: text,
          actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_api.ActionPanel, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              import_api.Action,
              {
                title: "Paste",
                icon: import_api.Icon.Clipboard,
                onAction: () => {
                  selectClipboardContents(selectedTab, index);
                  import_api.Clipboard.paste({ text });
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Action.Push, { title: "Preview", icon: import_api.Icon.Eye, target: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.Detail, { markdown: text }) })
          ] }),
          detail: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_api.List.Item.Detail, { markdown: text })
        },
        index
      ))
    }
  );
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vUmVwb3NpdG9yaWVzL2NvcHlxLXJheWNhc3Qvc3JjL3ZpZXctY2xpcGJvYXJkLWVudHJpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQge1xuICBnZXRQcmVmZXJlbmNlVmFsdWVzLFxuICBMaXN0LFxuICBJY29uLFxuICBBY3Rpb25QYW5lbCxcbiAgQWN0aW9uLFxuICBDbGlwYm9hcmQsXG4gIERldGFpbCxcbiAgb3BlbkV4dGVuc2lvblByZWZlcmVuY2VzLFxufSBmcm9tIFwiQHJheWNhc3QvYXBpXCI7XG5pbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBleGVjU3luYyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XG5cbi8vIEhhbmRsZSBwcmVmZXJlbmNlc1xuaW50ZXJmYWNlIEV4dGVuc2lvblByZWZlcmVuY2VzIHtcbiAgZGVmYXVsdF90YWI6IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQ29tbWFuZCgpIHtcbiAgLy8gRmV0Y2ggcHJlZmVyZW5jZXNcbiAgY29uc3QgeyBkZWZhdWx0X3RhYiB9ID0gZ2V0UHJlZmVyZW5jZVZhbHVlczxFeHRlbnNpb25QcmVmZXJlbmNlcz4oKTtcbiAgY29uc3QgY29weVFQYXRoID0gXCIvQXBwbGljYXRpb25zL0NvcHlRLmFwcC9Db250ZW50cy9NYWNPUy9Db3B5UVwiO1xuXG4gIC8vIEVycm9yIGhhbmRsaW5nIGZvciBtaXNzaW5nIENvcHlRIHBhdGggYW5kIENvcHlRIG5vdCBydW5uaW5nXG4gIHRyeSB7XG4gICAgZXhlY1N5bmMoYCR7Y29weVFQYXRofSB0YWJgLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxEZXRhaWxcbiAgICAgICAgbWFya2Rvd249e1xuICAgICAgICAgIFwiQ29weVEgbm90IGZvdW5kLCBvciBDb3B5USBzZXJ2ZXIgbm90IHJ1bm5pbmdcXG5cXG5QbGVhc2UgY2hlY2sgdGhhdCBDb3B5USBpcyBpbnN0YWxsZWQgcHJvcGVybHksIGFuZCBtYWtlIHN1cmUgQ29weVEgc2VydmVyIGlzIHJ1bm5pbmcuXCJcbiAgICAgICAgfVxuICAgICAgICBhY3Rpb25zPXtcbiAgICAgICAgICA8QWN0aW9uUGFuZWw+XG4gICAgICAgICAgICA8QWN0aW9uIHRpdGxlPVwiT3BlbiBDb21tYW5kIFByZWZlcmVuY2VzXCIgaWNvbj17SWNvbi5Db2d9IG9uQWN0aW9uPXtvcGVuRXh0ZW5zaW9uUHJlZmVyZW5jZXN9IC8+XG4gICAgICAgICAgICA8QWN0aW9uLlBhc3RlIHRpdGxlPVwiQ29weSBQYXRoIHRvIENsaXBib2FyZFwiIGNvbnRlbnQ9e2NvcHlRUGF0aH0gLz5cbiAgICAgICAgICA8L0FjdGlvblBhbmVsPlxuICAgICAgICB9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICAvLyBTdGF0ZSBmb3Igc2VsZWN0ZWQgdGFiIGFuZCBjbGlwYm9hcmQgY29udGVudHNcbiAgY29uc3QgW3NlbGVjdGVkVGFiLCBzZXRTZWxlY3RlZFRhYl0gPSB1c2VTdGF0ZShkZWZhdWx0X3RhYik7XG4gIGNvbnN0IFtjbGlwYm9hcmRDb250ZW50cywgc2V0Q2xpcGJvYXJkQ29udGVudHNdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcblxuICAvLyBHZXQgdGhlIGxpc3Qgb2YgdGFicyBmcm9tIENvcHlRIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgdGV4dFxuICBmdW5jdGlvbiBnZXRUYWJzKCk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBjb21tYW5kID0gYFwiJHtjb3B5UVBhdGh9XCIgdGFiYDtcbiAgICBjb25zdCBzdGRvdXQgPSBleGVjU3luYyhjb21tYW5kLCB7IGVuY29kaW5nOiBcInV0ZjhcIiB9KTtcblxuICAgIC8vIEZvcm1hdCBsaXN0IG9mIHRhYnMgZnJvbSBzdHJpbmcgdG8gYXJyYXlcbiAgICBjb25zdCBsaW5lcyA9IHN0ZG91dC5zcGxpdChcIlxcblwiKTtcbiAgICBjb25zdCBmb3JtYXR0ZWRMaXN0ID0gbGluZXMuZmlsdGVyKChsaW5lKSA9PiBsaW5lLnRyaW0oKSAhPT0gXCJcIik7XG4gICAgLy8gUmVtb3ZlICYgZnJvbSBpdGVtcyBpbiB0aGUgbGlzdFxuICAgIGNvbnN0IGNsZWFuZWRMaXN0ID0gZm9ybWF0dGVkTGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucmVwbGFjZShcIiZcIiwgXCJcIikpO1xuXG4gICAgcmV0dXJuIGNsZWFuZWRMaXN0O1xuICB9XG5cbiAgLy8gRHJvcGRvd24gY29tcG9uZW50IGZvciBzZWxlY3RpbmcgYSB0YWJcbiAgZnVuY3Rpb24gVGFiRHJvcGRvd24oKSB7XG4gICAgY29uc3QgdGFicyA9IGdldFRhYnMoKTtcbiAgICByZXR1cm4gKFxuICAgICAgPExpc3QuRHJvcGRvd25cbiAgICAgICAgdG9vbHRpcD1cIlNlbGVjdCBhIFRhYlwiXG4gICAgICAgIGRlZmF1bHRWYWx1ZT17ZGVmYXVsdF90YWJ9XG4gICAgICAgIHN0b3JlVmFsdWU9e2ZhbHNlfVxuICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaCBUYWJzXCJcbiAgICAgICAgb25DaGFuZ2U9eyhuZXdUYWIpID0+IHNldFNlbGVjdGVkVGFiKG5ld1RhYil9XG4gICAgICA+XG4gICAgICAgIHt0YWJzLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgPExpc3QuRHJvcGRvd24uSXRlbSBrZXk9e3RhYn0gdGl0bGU9e3RhYn0gdmFsdWU9e3RhYn0gLz5cbiAgICAgICAgKSl9XG4gICAgICA8L0xpc3QuRHJvcGRvd24+XG4gICAgKTtcbiAgfVxuXG4gIC8vIEdldHMgY2xpcGJvYXJkIGNvbnRlbnRzIGZvciBhIGdpdmVuIHRhYiBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiB0ZXh0XG4gIGZ1bmN0aW9uIGdldENsaXBib2FyZENvbnRlbnRzKHRhYjogc3RyaW5nKSB7XG4gICAgY29uc3QgY29tbWFuZCA9IGAke2NvcHlRUGF0aH0gdGFiICR7dGFifSAnc2VwYXJhdG9yKFN0cmluZy5mcm9tQ2hhckNvZGUoMCkpOyByZWFkLmFwcGx5KHRoaXMsIFsuLi5BcnJheShzaXplKCkpLmtleXMoKV0pJ2A7XG4gICAgY29uc3Qgc3Rkb3V0ID0gZXhlY1N5bmMoY29tbWFuZCwgeyBlbmNvZGluZzogXCJ1dGY4XCIsIHN0ZGlvOiAnaWdub3JlJyB9KTtcbiAgICAvLyBSZXR1cm4gdGhlIGFycmF5IHNwbGl0IGJ5IG51bGwgY2hhcmFjdGVyc1xuICAgIHJldHVybiBzdGRvdXQuc3BsaXQoXCJcXDBcIik7XG4gIH1cblxuICAvLyBTZWxlY3RzIGNsaXBib2FyZCBjb250ZW50IGZvciBhIGdpdmVuIHRhYiBhbmQgaW5kZXhcbiAgZnVuY3Rpb24gc2VsZWN0Q2xpcGJvYXJkQ29udGVudHModGFiOiBzdHJpbmcsIGluZGV4OiBudW1iZXIpIHtcbiAgICBjb25zdCBjb21tYW5kID0gYCR7Y29weVFQYXRofSB0YWIgJHt0YWJ9IHNlbGVjdCAke2luZGV4fWA7XG4gICAgZXhlY1N5bmMoY29tbWFuZCk7XG4gIH1cblxuICAvLyBFZmZlY3QgdG8gdXBkYXRlIGNsaXBib2FyZCBjb250ZW50cyB3aGVuIHRhYiBvciBtYXhFbnRyaWVzIGNoYW5nZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IG5ld0NsaXBib2FyZENvbnRlbnRzID0gZ2V0Q2xpcGJvYXJkQ29udGVudHMoc2VsZWN0ZWRUYWIpO1xuICAgIHNldENsaXBib2FyZENvbnRlbnRzKG5ld0NsaXBib2FyZENvbnRlbnRzKTtcbiAgfSwgW3NlbGVjdGVkVGFiXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TGlzdFxuICAgICAgbmF2aWdhdGlvblRpdGxlPVwiQ2xpcGJvYXJkIE1hbmFnZXJcIlxuICAgICAgc2VhcmNoQmFyUGxhY2Vob2xkZXI9XCJTZWFyY2ggQ2xpcGJvYXJkIENvbnRlbnRzXCJcbiAgICAgIHNlYXJjaEJhckFjY2Vzc29yeT17PFRhYkRyb3Bkb3duIC8+fVxuICAgICAgaXNTaG93aW5nRGV0YWlsPXt0cnVlfVxuICAgID5cbiAgICAgIHtjbGlwYm9hcmRDb250ZW50cy5tYXAoKHRleHQsIGluZGV4KSA9PiAoXG4gICAgICAgIDxMaXN0Lkl0ZW1cbiAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgIHRpdGxlPXt0ZXh0fVxuICAgICAgICAgIGFjdGlvbnM9e1xuICAgICAgICAgICAgPEFjdGlvblBhbmVsPlxuICAgICAgICAgICAgICA8QWN0aW9uXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJQYXN0ZVwiXG4gICAgICAgICAgICAgICAgaWNvbj17SWNvbi5DbGlwYm9hcmR9XG4gICAgICAgICAgICAgICAgb25BY3Rpb249eygpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNlbGVjdENsaXBib2FyZENvbnRlbnRzKHNlbGVjdGVkVGFiLCBpbmRleCk7XG4gICAgICAgICAgICAgICAgICBDbGlwYm9hcmQucGFzdGUoeyB0ZXh0IH0pO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxBY3Rpb24uUHVzaCB0aXRsZT1cIlByZXZpZXdcIiBpY29uPXtJY29uLkV5ZX0gdGFyZ2V0PXs8RGV0YWlsIG1hcmtkb3duPXt0ZXh0fSAvPn0gLz5cbiAgICAgICAgICAgIDwvQWN0aW9uUGFuZWw+XG4gICAgICAgICAgfVxuICAgICAgICAgIGRldGFpbD17PExpc3QuSXRlbS5EZXRhaWwgbWFya2Rvd249e3RleHR9IC8+fVxuICAgICAgICAvPlxuICAgICAgKSl9XG4gICAgPC9MaXN0PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBU087QUFDUCxtQkFBb0M7QUFDcEMsMkJBQXlCO0FBc0JmO0FBZkssU0FBUixVQUEyQjtBQUVoQyxRQUFNLEVBQUUsWUFBWSxRQUFJLGdDQUEwQztBQUNsRSxRQUFNLFlBQVk7QUFHbEIsTUFB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
