"use client";
import styled from "styled-components";
import {
  headerHeight,
  sidebarWidth,
  topNavigationHeight,
} from "@/config/layout-config";
import { navigation } from "@/config/layout-config";

export const StyledDiv = styled.div`
  color: blue;
  font-size: 20px;
  background-color: ${(props) => (props.isActive ? "green" : "red")};
`;

export const DashboardLayoutDiv = styled.div`
  height: 100vh;
  overflow-y: hidden;
`;

export const DashboardHeaderDiv = styled.div`
  height: ${headerHeight};
`;

export const HeaderNavigationDiv = styled.div`
  height: ${topNavigationHeight};
`;

export const DashboardWrapperDiv = styled.div`
  height: calc(
    100vh - ${headerHeight} -
      ${navigation === "horizontal" ? topNavigationHeight : "0px"}
  );
`;

// export const DashboardContentDiv = styled.div`
//   height: calc(
//     100vh - ${headerHeight} -
//       ${navigation === "horizontal" ? topNavigationHeight : "0px"}
//   );
//   width: calc(100vw - ${navigation === "vertical" ? sidebarWidth : "0px"});
// `;

export const DashboardContentDiv = styled.div`
  height: calc(
    100vh - ${headerHeight} -
      ${navigation === "horizontal" ? topNavigationHeight : "0px"}
  );
  flex: 1;
`;

// export const DashboardSidebarDiv = styled.div`
//   height: calc(
//     100vh - ${headerHeight} -
//       ${navigation === "horizontal" ? topNavigationHeight : "0px"}
//   );
//   width: ${sidebarWidth};
//   overflow: hidden;
// `;

export const DashboardSidebarDiv = styled.div`
  height: calc(
    100vh - ${headerHeight} -
      ${navigation === "horizontal" ? topNavigationHeight : "0px"}
  );
  overflow: hidden;
`;

