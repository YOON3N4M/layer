interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <div className="absolute top-0 left-0 p-md">
      <header>
        <h1 className="font-bold opacity-50">LAYER</h1>
      </header>
    </div>
  );
}

export default Header;
