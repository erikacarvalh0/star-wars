import React from 'react'

import LogoIcon from "../icons/Logo.tsx"

import './index.scss'

export const Header = () => {

	return (
		<header className="header">
			<LogoIcon className="header__logo" />
		</header>
	)
}