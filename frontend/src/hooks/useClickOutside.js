import { useEffect } from "react";

/**
 * Calls `handler` when a click/touch happens outside the given ref.
 * Extracted from the duplicated dropdown-close logic that used to live in
 * both the notifications and profile menus in Navbar.
 *
 *   const ref = useRef(null);
 *   useClickOutside(ref, () => setOpen(false));
 */
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
};

export default useClickOutside;
