import { Router } from '@lit-labs/router';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-router')
export class AppRouter extends LitElement {
	private router = new Router(this, []);

	override render() {
		return this.router.outlet();
	}
}
