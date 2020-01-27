import SocialBarItem from '@components/socialMedia/socialBarItem'
import { IBarType } from '@et/types/Products'
import React from 'react'

const socialData = {
	youTube: {
		type: 'youtube-tuts',
		cat: 'youtube',
		title: 'Looking for free tutorials?',
		description: 'You can also find me every Tuesday sharing a new design, Procreate or lettering tutorial on YouTube',
		svg: 'Youtube',
		buttonText: 'watch',
		link: 'https://youtube.com/everytues',
		svgColor: '#fff'
	},
	procreateInsta: {
		type: 'procreate-Instagram',
		cat: 'Instagram',
		title: 'See more Procreate artwork',
		description: 'To see more Procreate artwork using these brushes, find me on Instagram!',
		svg: 'Instagram',
		buttonText: 'Follow',
		link: 'https://instagram.com/everytuesday',
		svgColor: '#fff'
	},
	procreateCourse: {
		type: 'procreateBeg-course',
		cat: 'Free Course',
		title: 'Procreate for Beginners',
		description: 'If you’re new to Procreate, check out my free course, Procreate for Beginners!',
		svg: 'Youtube',
		buttonText: 'Enroll',
		link: 'https://every-tuesday.com/procreate-for-beginners',
		svgColor: '#fff',
		staticImagePath: 'procreateLogo.png'
	}
}

function getSocialBar (type: string) {
	switch (type) {
		case 'youtube-tuts':
			return (
				<SocialBarItem key={type} {...socialData.youTube}/>
			)
		case 'procreate-Instagram':
			return (
				<SocialBarItem key={type} {...socialData.procreateInsta}
				/>
			)
		case 'procreateBeg-course':
			return (
				<SocialBarItem key={type} {...socialData.procreateCourse}/>
			)
	}
}

interface IProps {
	bars: IBarType[]
}

const SocialMediaBars = (props: IProps) => {
	return (
		<>
			{props.bars.map(bar => (
				getSocialBar(bar.type)
			))}
		</>
	)
}
export default React.memo(SocialMediaBars)
