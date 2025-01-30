import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './tr-layout.ts';
import './tr-library-list.ts';

@customElement('tr-router')
export class TRRouter extends LitElement {
	private router = new Router(this, [
		{
			path: '/libraries',
			render: () => html`<tr-library-list></tr-library-list>`,
		},
	]);

	override render() {
		return html`<tr-layout>${this.router.outlet()}</tr-layout>`;
	}
}
