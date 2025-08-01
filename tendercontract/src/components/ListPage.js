import React from 'react';
import Navbar from './YourComponent';
import Memos from './ListOfTenders';
import Footer from './Home_Footer';

function ListPage({ state}) {
  sessionStorage.setItem('buttonClicked', 'false');
  return (
    <>
      <Navbar islogin={true} page = {2}/>
      <Memos state={state} />
      <Footer />
    </>
  );
}

export default ListPage;
