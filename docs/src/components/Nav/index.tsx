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
import HighContrastData from '@/data/build.data.high-contrast.json';
import FlatData from '@/data/build.data.flat.json';
import ModernData from '@/data/build.data.modern.json';
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
                <span className="badge yellow">{HighContrastData.length}</span>
              }
              title={'High Contrast'}
              icon={<Regular />}
            >
              {/* <MenuItem icon={<Fonticons />}>
                <Link href="/high-contrast">
                  <a>Fonticons</a>
                </Link>
              </MenuItem> */}
              {/* <MenuItem icon={<Unicode />}>
                <Link href="/high-contrast/unicode">
                  <a>Unicode</a>
                </Link>
              </MenuItem> */}
              <MenuItem icon={<SVG />}>
                <Link href="/high-contrast">
                  <a>SVG</a>
                </Link>
              </MenuItem>
            </SubMenu>
          </Menu>
          <Menu iconShape="circle">
            <SubMenu
              suffix={<span className="badge yellow">{FlatData.length}</span>}
              title={'Flat'}
              icon={<Solid />}
            >
              {/* <MenuItem icon={<Fonticons />}>
                <Link href="/flat">
                  <a>Fonticons</a>
                </Link>
              </MenuItem> */}
              {/* <MenuItem icon={<Unicode />}>
                <Link href="/flat/unicode">
                  <a>Unicode</a>
                </Link>
              </MenuItem> */}
              <MenuItem icon={<SVG />}>
                <Link href="/flat">
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
                <Link href="/modern">
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
              href="https://github.com/MKAbuMattar/fluentui-emoji"
              target="__blank"
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
