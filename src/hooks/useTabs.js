import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  selectAccessibleTabs,
  updateAccessibleTabs,
} from "../store/slice/authSlice.js";
import { tabAPI } from "../api/index.js";

/**
 * useTabs — composable hook for working with the accessible-tabs system.
 *
 * accessibleTabs  — full array from Redux (populated on login from server)
 * hasAccess(path) — true if the current user can visit that path
 * getTabsByGroup  — filter tabs by their nav group
 * getTab(key)     — find a single tab by its key
 * refreshTabs     — re-fetches tabs from server (call after admin changes permissions)
 */
export const useTabs = () => {
  const dispatch = useDispatch();
  const accessibleTabs = useSelector(selectAccessibleTabs) || [];

  /** Is this path in the user's accessible tabs and currently active? */
  const hasAccess = useCallback(
    (path) => accessibleTabs.some((t) => t.path === path && t.isActive),
    [accessibleTabs],
  );

  /** All tabs for a given group, sorted by order. */
  const getTabsByGroup = useCallback(
    (group) =>
      accessibleTabs
        .filter((t) => t.group === group && t.isActive)
        .sort((a, b) => a.order - b.order),
    [accessibleTabs],
  );

  /** Single tab by key. */
  const getTab = useCallback(
    (key) => accessibleTabs.find((t) => t.key === key),
    [accessibleTabs],
  );

  /**
   * Re-fetch tabs from the server and sync Redux + localStorage.
   * Call this when an admin may have changed the user's tab access.
   */
  const refreshTabs = useCallback(async () => {
    try {
      const res = await tabAPI.getMyTabs();
      const tabs = res.data;
      dispatch(updateAccessibleTabs(tabs));
      return tabs;
    } catch {
      // Silently fail — existing tabs remain active
    }
  }, [dispatch]);

  return { accessibleTabs, hasAccess, getTabsByGroup, getTab, refreshTabs };
};
