import logoURL from 'img/NNLogoWhite.png'
const Header = ({showForm,setShowForm}) => {
  return (
    <>
    <header>
      <div className="logo">
        <img src={logoURL} alt="site logo" />
      </div>
      <h1>Neighbourhood Needs</h1>
      <button className="form-toggle" onPointerDown={() => setShowForm((show) => !show )}>{showForm? `Close`:`Make an Entry!`}</button>
    </header>
  </>
  )
}

export default Header