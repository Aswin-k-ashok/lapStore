// import React, { useState } from 'react'
// import '../component/component_css/HeaderNew.css'
// function HeaderNew() {
//   return (
//     <Navbar>
//       <NavItem icon={<BoltIcon />} />
//       <NavItem icon='🔥' />
//       <NavItem icon='🔥' />

//       <NavItem icon={<CaretIcon />}>
//         <DropdownMenu></DropdownMenu>
//       </NavItem>
//     </Navbar>
//   )
// }

// function Navbar(props) {
//   return (
//     <nav className='navbar'>
//       <ul className='navbar-nav'>{props.children}</ul>
//     </nav>
//   )
// }

// function NavItem(props) {
//   const [open, setOpen] = useState(false)

//   return (
//     <li className='nav-item'>
//       <a href='#' className='icon-button' onClick={() => setOpen(!open)}>
//         {props.icon}
//       </a>

//       {open && props.children}
//     </li>
//   )
// }

// function DropdownMenu() {
//   function DropdownItem(props) {
//     return (
//       <a href='#' className='menu-item'>
//         <span className='icon-button'>{props.leftIcon}</span>
//         {props.children}
//         <span className='icon-right'>{props.rightIcon}</span>
//       </a>
//     )
//   }

//   return (
//     <div className='dropdown'>
//       <DropdownItem>Foo</DropdownItem>
//       <DropdownItem leftIcon={<BoltIcon />}>Bar</DropdownItem>
//     </div>
//   )
// }

// function DropdownMenu() {
//   const [activeMenu, setActiveMenu] = useState('main');

//   function DropdownItem(props) {
//     return (
//       <a href="#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
//         ...
//       </a>
//     );
//   }

//   return (
//     <div className="dropdown">

//       <CSSTransition
//         in={activeMenu === 'main'}
//         timeout={500}
//         classNames="menu-primary"
//         unmountOnExit>

//         <div className="menu">
//           <DropdownItem>My Profile</DropdownItem>
//           <DropdownItem
//             leftIcon={<CogIcon />}
//             rightIcon={<ChevronIcon />}
//             goToMenu="settings">
//             Settings
//           </DropdownItem>

//         </div>
//       </CSSTransition>

//       <CSSTransition
//         in={activeMenu === 'settings'}
//         timeout={500}
//         classNames="menu-secondary"
//         unmountOnExit>

//         <div className="menu">
//           <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
//             <h2>Go back</h2>
//           </DropdownItem>
//         </div>

//       </CSSTransition>

//     </div>
//   );
// }

// function DropdownMenu() {

//   const [menuHeight, setMenuHeight] = useState(null);

//   function calcHeight(el) {
//     const height = el.offsetHeight;
//     setMenuHeight(height);
//   }

//   return (
//     <div className="dropdown" style={{ height: menuHeight }}>

//         <CSSTransition onEnter={calcHeight}/>

//         </div>

//   )

// export default HeaderNew
