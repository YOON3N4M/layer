interface HeaderProps {}

function Header(props: HeaderProps) {
  const {} = props;

  return (
    <div className="fixed p-md w-min  z-[1000]">
      <header>
        <h1 className="font-bold opacity-50">LAYER</h1>
      </header>
    </div>
  );
}

export default Header;
