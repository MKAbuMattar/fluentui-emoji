import DeviconsReactOriginal from 'devicons-react/lib/icons/DeviconsReactOriginal';
import Link from 'next/link';
import { FC } from 'react';
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SubMenu,
} from 'react-pro-sidebar';

import SidebarBg from '@/assets/img/bg2.jpg';
import ModernData from '@/data/build.data.modern.json';
import RegularData from '@/data/build.data.regular.json';
import SolidData from '@/data/build.data.solid.json';
import { Fonticons, Modern, Regular, Solid, SVG, Unicode } from '@/icons/index';

import pkg from '../../../package.json';
import { NavBanner, NavGithub, NavTitle } from './style';

type Props = {
  collapsed?: boolean;
  toggled?: boolean;
  handleToggleSidebar?: any;
};

const Nav: FC<Props> = (props) => {
  const { collapsed, toggled, handleToggleSidebar } = props;

  return (
    <>
      <ProSidebar
        image={SidebarBg.src}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <Link href="/">
            <a>
              <NavTitle>
                <NavBanner>
                  <DeviconsReactOriginal width={'3rem'} height={'3rem'} />
                </NavBanner>
                Fluentui Emoji
              </NavTitle>
            </a>
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<DeviconsReactOriginal width={'24'} height={'24'} />}
              suffix={<span className="badge red">{pkg.version}</span>}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </MenuItem>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={
                <span className="badge yellow">{RegularData.length}</span>
              }
              title={'Regular'}
              icon={<Regular />}
            >
              <MenuItem icon={<Fonticons />}>
                <Link href="/regular">
                  <a>Fonticons</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<Unicode />}>
                <Link href="/regular/unicode">
                  <a>Unicode</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<SVG />}>
                <Link href="/regular/svg">
                  <a>SVG</a>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">{SolidData.length}</span>}
              title={'Solid'}
              icon={<Solid />}
            >
              <MenuItem icon={<Fonticons />}>
                <Link href="/solid">
                  <a>Fonticons</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<Unicode />}>
                <Link href="/solid/unicode">
                  <a>Unicode</a>
                </Link>
              </MenuItem>
              <MenuItem icon={<SVG />}>
                <Link href="/solid/svg">
                  <a>SVG</a>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">{ModernData.length}</span>}
              title={'Modern'}
              icon={<Modern />}
            >
              <MenuItem icon={<SVG />}>
                <Link href="/modern/svg">
                  <a>SVG</a>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter style={{ textAlign: 'center' }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: '20px 24px',
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <span>
                <NavGithub />
              </span>
              <span
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Nav;
