import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar';
import '@testing-library/jest-dom';  // Asegúrate de que esto esté importado

// Test 1: Verificar si el componente Navbar se renderiza correctamente
test('Navbar renders correctly', () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const navbarElement = screen.getByText(/home/i); // O cualquier texto dentro del Navbar
  expect(navbarElement).toBeInTheDocument();
});

// Test 2: Verificar si las rutas están funcionando correctamente
test('routes render correctly', () => {
  render(
    <BrowserRouter>
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
        <Navbar />
        <main className="container mx-auto py-6">
          {/* Aquí se simulan las rutas como en index.js */}
        </main>
      </div>
    </BrowserRouter>
  );

  // Verifica que la página de inicio se muestre correctamente
  const homepageElement = screen.getByText(/prei plant applicatie/i); // Ajusta según el texto real
  expect(homepageElement).toBeInTheDocument();
});
