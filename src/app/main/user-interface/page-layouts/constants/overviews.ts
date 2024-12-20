import CardedFullWidthNormalScrollComponent from '../carded/full-width/CardedFullWidthNormalScrollComponent';
import CardedFullWidthPageScrollComponent from '../carded/full-width/CardedFullWidthPageScrollComponent';
import CardedFullWidthContentScrollComponent from '../carded/full-width/CardedFullWidthContentScrollComponent';
import CardedWithSidebarsNormalScrollComponent from '../carded/with-sidebars/CardedWithSidebarsNormalScrollComponent';
import CardedWithSidebarsPageScrollComponent from '../carded/with-sidebars/CardedWithSidebarsPageScrollComponent';
import CardedWithSidebarsContentScrollComponent from '../carded/with-sidebars/CardedWithSidebarsContentScrollComponent';
import SimpleFullWidthNormalScrollComponent from '../simple/full-width/SimpleFullWidthNormalScrollComponent';
import SimpleFullWidthPageScrollComponent from '../simple/full-width/SimpleFullWidthPageScrollComponent';
import SimpleFullWidthContentScrollComponent from '../simple/full-width/SimpleFullWidthContentScrollComponent';
import SimpleWithSidebarsNormalScrollComponent from '../simple/with-sidebars/SimpleWithSidebarsNormalScrollComponent';
import SimpleWithSidebarsPageScrollComponent from '../simple/with-sidebars/SimpleWithSidebarsPageScrollComponent';
import SimpleWithSidebarsContentScrollComponent from '../simple/with-sidebars/SimpleWithSidebarsContentScrollComponent';

const overviews = {
	carded: {
		fullWidth: {
			title: 'Carded Full Width Page Layout',
			description:
				'Carded layout that spans the entire width of the content area with a dedicated header and 3 different scroll modes.',
			availableOptions: [
				{
					value: 'normalScroll',
					title: 'Normal Scroll'
				},
				{
					value: 'pageScroll',
					title: 'Page Scroll'
				},
				{
					value: 'contentScroll',
					title: 'Content Scroll'
				}
			],
			selectedOption: 'normalScroll',
			options: {
				normalScroll: {
					description: 'No scrolling area manipulations, entire viewport scrolls (body scroll).',
					link: '/ui/page-layouts/carded/full-width/normal-scroll',
					component: CardedFullWidthNormalScrollComponent
				},
				pageScroll: {
					description:
						'Only the page area scrolls making the main toolbar and footer to stick to the top and bottom of the viewport respectively.',
					link: '/ui/page-layouts/carded/full-width/page-scroll',
					component: CardedFullWidthPageScrollComponent
				},
				contentScroll: {
					description:
						'Only the content area of the page scrolls making everything else to stick into their positions.',
					link: '/ui/page-layouts/carded/full-width/content-scroll',
					component: CardedFullWidthContentScrollComponent
				}
			}
		},
		withSidebars: {
			title: 'Carded Page Layout With Sidebars',
			description: 'Layout with left and right sidebars, a dedicated header and 3 different scroll modes.',
			availableOptions: [
				{
					value: 'normalScroll',
					title: 'Normal Scroll'
				},
				{
					value: 'pageScroll',
					title: 'Page Scroll'
				},
				{
					value: 'contentScroll',
					title: 'Content Scroll'
				}
			],
			selectedOption: 'normalScroll',
			options: {
				normalScroll: {
					description: 'No scrolling area manipulations, entire viewport scrolls (body scroll).',
					link: '/ui/page-layouts/carded/with-sidebars/normal-scroll',
					component: CardedWithSidebarsNormalScrollComponent
				},
				pageScroll: {
					description:
						'Only the page area scrolls making the main toolbar and footer to stick to the top and bottom of the viewport respectively.',
					link: '/ui/page-layouts/carded/with-sidebars/page-scroll',
					component: CardedWithSidebarsPageScrollComponent
				},
				contentScroll: {
					description:
						'Only the content area of the page scrolls making everything else to stick into their positions.',
					link: '/ui/page-layouts/carded/with-sidebars/content-scroll',
					component: CardedWithSidebarsContentScrollComponent
				}
			}
		}
	},
	simple: {
		fullWidth: {
			title: 'Simple Full Width Page Layout',
			description:
				'Layout that spans the entire width of the content area with a dedicated header and 3 different scroll modes.',
			availableOptions: [
				{
					value: 'normalScroll',
					title: 'Normal Scroll'
				},
				{
					value: 'pageScroll',
					title: 'Page Scroll'
				},
				{
					value: 'contentScroll',
					title: 'Content Scroll'
				}
			],
			selectedOption: 'normalScroll',
			options: {
				normalScroll: {
					description: 'No scrolling area manipulations, entire viewport scrolls (body scroll).',
					link: '/ui/page-layouts/simple/full-width/normal-scroll',
					component: SimpleFullWidthNormalScrollComponent
				},
				pageScroll: {
					description:
						'Only the page area scrolls making the main toolbar and footer to stick to the top and bottom of the viewport respectively.',
					link: '/ui/page-layouts/simple/full-width/page-scroll',
					component: SimpleFullWidthPageScrollComponent
				},
				contentScroll: {
					description:
						'Only the content area of the page scrolls making everything else to stick into their positions.',
					link: '/ui/page-layouts/simple/full-width/content-scroll',
					component: SimpleFullWidthContentScrollComponent
				}
			}
		},
		withSidebars: {
			title: 'Simple Page Layout With Sidebars',
			description: 'Layout with left and right sidebars, a dedicated header and 3 different scroll modes.',
			availableOptions: [
				{
					value: 'normalScroll',
					title: 'Normal Scroll'
				},
				{
					value: 'pageScroll',
					title: 'Page Scroll'
				},
				{
					value: 'contentScroll',
					title: 'Content Scroll'
				}
			],
			selectedOption: 'normalScroll',
			options: {
				normalScroll: {
					description: 'No scrolling area manipulations, entire viewport scrolls (body scroll).',
					link: '/ui/page-layouts/simple/with-sidebars/normal-scroll',
					component: SimpleWithSidebarsNormalScrollComponent
				},
				pageScroll: {
					description:
						'Only the page area scrolls making the main toolbar and footer to stick to the top and bottom of the viewport respectively.',
					link: '/ui/page-layouts/simple/with-sidebars/page-scroll',
					component: SimpleWithSidebarsPageScrollComponent
				},
				contentScroll: {
					description:
						'Only the content area of the page scrolls making everything else to stick into their positions.',
					link: '/ui/page-layouts/simple/with-sidebars/content-scroll',
					component: SimpleWithSidebarsContentScrollComponent
				}
			}
		}
	}
};

export default overviews;
