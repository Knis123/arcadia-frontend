import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Composant Layout pour structurer les pages avec une barre de navigation et un pied de page
const Layout = ({ children, hideNavbar }) => {
  return (
    <>
      {/* Affiche la barre de navigation si hideNavbar est faux */}
      {!hideNavbar && <Navbar />}
      <main>{children}</main> {/* Contenu principal de la page */}
      <Footer /> {/* Pied de page */}
    </>
  );
};

export default Layout;
