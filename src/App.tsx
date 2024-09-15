import React from 'react';
import classNames from 'classnames';

import { MainContext } from './context/index.tsx';

import { Header } from './components/Header/index.tsx';
import { List } from './components/List/index.tsx';
import { Filter } from './components/Filter/index.tsx';
import { Search } from './components/Search/index.tsx';
import { Pagination } from './components/Pagination/index.tsx';
import { Splash } from './components/Splash/index.tsx';

import { useApp } from './hook.ts';

import './styles/index.scss';
import './App.scss';

function App() {
  const {
		contextValue,
		showSplash,
		showPagination
	} = useApp()

  return (
    <MainContext.Provider value={contextValue}>
      <main className="app">
        {showSplash && <Splash />}
        <div className={classNames("content", { 'visible': !showSplash})}>
          <Header />
          <div className="container">
            <Search />
            <Filter />
          </div>
          <List />
          {showPagination  && <Pagination />}
          {contextValue.listedPeopleState[0].length == 0 && <p className="app__no-items">No items to show</p>}
        </div>
      </main> 
    </MainContext.Provider>
  );
}

export default App;
