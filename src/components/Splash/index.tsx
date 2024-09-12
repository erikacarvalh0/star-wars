import React from 'react'

import Logo from "../icons/Logo.tsx"
import './index.scss'

export const Splash = () => (
	<div className="splash">
		<div className="splash__logo-container">
			<Logo className="splash__logo" />
		</div>
	</div>
)