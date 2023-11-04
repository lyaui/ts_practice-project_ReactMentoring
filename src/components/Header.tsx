function formatNavName(name: string): string {
  let nameArr = name.toLowerCase().split(' ');
  return nameArr
    .map((_word) => _word.charAt(0).toUpperCase() + _word.slice(1))
    .join(' ');
}

function Header() {
  const navItems = [
    { name: 'our mission', to: '/home' },
    { name: 'browse sessions', to: '/sessions' },
    { name: 'upcoming sessions', onClick: () => {} },
  ];

  return (
    <header id='main-header'>
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          {navItems.map((_item) => (
            <li>
              <a>{formatNavName(_item.name)}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
