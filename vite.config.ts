import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';
import devtools from 'solid-devtools/vite';

export default defineConfig({
	plugins: [
		devtools({
			autoname: true,
		}),
		solid(),
		VitePWA({
			workbox: {
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'gstatic-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
					{
						urlPattern: /^https:\/\/(timetable|navbar)\.api\.(test\.)?profcomff.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'timetable-api-cache',
							expiration: {
								maxEntries: 30,
								maxAgeSeconds: 60 * 60 * 24 * 30, // <== ~ month
							},
							cacheableResponse: {
								statuses: [0, 200],
							},
						},
					},
				],
			},
			manifest: {
				icons: [
					{
						src: 'icons/maskable/icon_1024x1024.webp',
						sizes: '1024x1024',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_512x512.webp',
						sizes: '512x512',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_192x192.webp',
						sizes: '192x192',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_144x144.webp',
						sizes: '144x144',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_96x96.webp',
						sizes: '96x96',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_72x72.webp',
						sizes: '72x72',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_48x48.webp',
						sizes: '48x48',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/maskable/icon_36x36.webp',
						sizes: '36x36',
						type: 'image/webp',
						purpose: 'maskable',
					},
					{
						src: 'icons/icon_512x512.webp',
						sizes: '512x512',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_192x192.webp',
						sizes: '192x192',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_144x144.webp',
						sizes: '144x144',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_96x96.webp',
						sizes: '96x96',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_72x72.webp',
						sizes: '72x72',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_48x48.webp',
						sizes: '48x48',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_36x36.webp',
						sizes: '36x36',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_1024x1024.webp',
						sizes: '1024x1024',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_1024x1024.png',
						sizes: '1024x1024',
						type: 'image/png',
					},
					{
						src: 'icons/icon_180x180.webp',
						sizes: '180x180',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_167x167.webp',
						sizes: '167x167',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_152x152.webp',
						sizes: '152x152',
						type: 'image/webp',
					},
					{
						src: 'icons/icon_120x120.webp',
						sizes: '120x120',
						type: 'image/webp',
					},
				],
				name: 'Твой физфак!',
				short_name: 'Твой ФФ!',
				orientation: 'portrait',
				display: 'standalone',
				start_url: '/timetable',
				description: 'Приложение с сервисами для студентов и сотрудников физического факультета МГУ',
				theme_color: '#00004b',
				background_color: '#00004b',
				lang: 'ru',
			},
		}),
	],
	server: {
		port: 5173,
	},
	build: {
		target: 'esnext',
	},
	publicDir: 'src/public',
});
