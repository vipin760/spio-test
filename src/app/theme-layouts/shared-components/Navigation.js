import FuseNavigation from "@fuse/core/FuseNavigation";
import clsx from "clsx";
import { memo, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectNavigation } from "app/store/fuse/navigationSlice";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { navbarCloseMobile } from "app/store/fuse/navbarSlice";
import { selectUser } from "app/store/userSlice";

const filterNavItemsByRole = (navItem, user) => {
  if (!navItem?.authRoles) return true;
  if (navItem?.authRoles?.includes(user?.authRole)) {
    return true;
  }
  return false;
};

const filterNavItemsByHost = (navItem) => {
  const hostName = window.location.hostname
  console.log('===================?hostName', hostName);
  if (!navItem?.host) return false;
  if (navItem?.host?.includes(hostName)) {
    return true;
  }
}


function Navigation(props) {
  const navigation = useSelector(selectNavigation);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigationRef = navigation
    ?.filter((navItem) => {
      const hostName = window.location.hostname;
      const hideIndices = navItem.hide;
      const shouldHide = hideIndices?.some(index => navItem.host[index] === hostName);
      const customNavItem = shouldHide ? false : navItem;
      return filterNavItemsByHost(customNavItem);
    })
    ?.filter((navItem) => {
      return filterNavItemsByRole(navItem, user);
    })
    ?.map((navItem) => {
      return {
        ...navItem,
        children: navItem?.children?.filter((childNavItem) => {
          const hostName = window.location.hostname;
          const hideIndices = childNavItem?.hide;
          let shouldHide;
          if(!childNavItem?.host){
            shouldHide = false;
          }else{
            shouldHide = hideIndices?.some(index => childNavItem?.host[index] === hostName);
          }
          let customChildNavItem;
          if(shouldHide){
            return false;
          }else{
            return filterNavItemsByRole(customChildNavItem, user);
          }
        }),
      };
    });
  return useMemo(() => {
    function handleItemClick(item) {
      if (isMobile) {
        dispatch(navbarCloseMobile());
      }
    }

    return (
      <FuseNavigation
        className={clsx("navigation", props.className)}
        navigation={navigationRef}
        layout={props.layout}
        dense={props.dense}
        active={props.active}
        onItemClick={handleItemClick}
      />
    );
  }, [
    dispatch,
    isMobile,
    navigation,
    props.active,
    props.className,
    props.dense,
    props.layout,
  ]);
}

Navigation.defaultProps = {
  layout: "vertical",
};

export default memo(Navigation);
