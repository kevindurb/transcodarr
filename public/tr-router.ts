import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { safeParseInt } from './utils/numbers.ts';

import './tr-layout.ts';
import './tr-library-list.ts';
import './tr-library-files.ts';
import './tr-preset-list.ts';

@customElement('tr-router')
export class TRRouter extends LitElement {
	private router = new Router(this, [
		{
			path: '/libraries',
			render: () => html`<tr-library-list></tr-library-list>`,
		},
		{
			path: '/libraries/:mediaLibraryId',
			render: ({ mediaLibraryId }) =>
				html`<tr-library-files
          mediaLibraryId=${ifDefined(safeParseInt(mediaLibraryId))}
        ></tr-library-files>`,
		},
		{
			path: '/presets',
			render: () => html`<tr-preset-list></tr-preset-list>`,
		},
	]);

	override render() {
		return html`<tr-layout>${this.router.outlet()}</tr-layout>`;
	}
}
