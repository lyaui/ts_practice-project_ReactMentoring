import Button from '@/components/Button';

function formatNavName(name: string): string {
  let nameArr = name.toLowerCase().split(' ');
  return nameArr
    .map((_word) => _word.charAt(0).toUpperCase() + _word.slice(1))
    .join(' ');
}

function Header() {
  const navItems = [
    { children: 'our mission', to: '/', isText: true },
    { children: 'browse sessions', to: '/sessions', isText: true },
    { children: 'upcoming sessions', onClick: () => {} },
  ];

  return (
    <header id='main-header'>
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          {navItems.map((_item) => (
            <li key={_item.children}>
              <Button {..._item}>{formatNavName(_item.children)}</Button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
