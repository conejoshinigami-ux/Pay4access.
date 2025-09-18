import { useState } from "react";
import "./App.css";

const products = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Producto ${i + 1}`,
  price: ((i + 1) * 100).toString(),
  image: `https://picsum.photos/200/200?random=${i + 1}`
}));

function App() {
  const [grantUrl, setGrantUrl] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) { setUser(found); setView("store"); setMessage(""); }
    else setMessage("Correo o contraseña incorrectos");
  };

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) { setMessage("Usuario ya existe"); return; }
    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    setUser(newUser);
    setView("store");
    setMessage("");
  };

  const addToCart = (product) => setCart([...cart, product]);
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const crearPago = async () => {
    if (cart.length === 0) { setMessage("El carrito está vacío"); return; }
    const total = cart.reduce((acc, p) => acc + parseInt(p.price), 0);
    setMessage("Generando grant...");
    const res = await fetch("http://localhost:4000/pago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: total.toString() })
    });
    const data = await res.json();
    if (data.url) {
      setGrantUrl(data.url);
      setMessage("Abre el enlace para aceptar el pago y luego presiona 'Finalizar pago'.");
      setShowCart(false);
    } else setMessage(data.error || "Error al crear pago");
  };

  const finalizarPago = async () => {
    setMessage("Finalizando pago...");
    const res = await fetch("http://localhost:4000/finalizar-pago", { method: "POST" });
    const data = await res.json();
    if (data.outgoingPayment) {
      setMessage("✅ Pago completado!");
      setCart([]);
      setGrantUrl("");
    } else setMessage(data.error || "Error al finalizar pago");
  };

  if (view === "login")
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Login</h1>
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button onClick={handleLogin}>Iniciar sesión</button>
        <p>¿No tienes cuenta? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setView("register"); setMessage(""); }}>Regístrate</span></p>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    );

  if (view === "register")
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Registro</h1>
        <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button onClick={handleRegister}>Registrarse</button>
        <p>¿Ya tienes cuenta? <span style={{ color: "blue", cursor: "pointer" }} onClick={() => { setView("login"); setMessage(""); }}>Inicia sesión</span></p>
        <p style={{ color: "red" }}>{message}</p>
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h1>Bienvenido, {user.email}</h1>
      <button onClick={openCart}>Carrito ({cart.length})</button>
      <button style={{ marginLeft: 10 }} onClick={() => { setView("login"); setUser(null); setCart([]); setMessage(""); }}>Cerrar sesión</button>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, marginTop: 20 }}>
        {products.map(p => (
          <div key={p.id} style={{ border: "1px solid #ccc", padding: 10, borderRadius: 10, width: 200 }}>
            <img src={p.image} alt={p.name} style={{ width: "100%", borderRadius: 10 }} />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => addToCart(p)}>Agregar al carrito</button>
          </div>
        ))}
      </div>

      {showCart && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "#fff", padding: 20, borderRadius: 10, width: 400 }}>
            <h2>Carrito</h2>
            {cart.map(p => <p key={p.id}>{p.name} - ${p.price}</p>)}
            <p>Total: ${cart.reduce((acc, p) => acc + parseInt(p.price), 0)}</p>
            <button onClick={crearPago}>Pagar</button>
            <button onClick={closeCart} style={{ marginLeft: 10 }}>Cerrar</button>
          </div>
        </div>
      )}

      {grantUrl && (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <p>Grant interactivo generado. Abre el enlace:</p>
          <a href={grantUrl} target="_blank" rel="noopener noreferrer">{grantUrl}</a>
          <br />
          <button onClick={finalizarPago}>Finalizar pago</button>
        </div>
      )}

      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}

export default App;
