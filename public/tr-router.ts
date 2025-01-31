import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './tr-layout.ts';
import './tr-library-list.ts';
import './tr-library-files.ts';
import { safeParseInt } from './utils/numbers.ts';

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
	]);

	override render() {
		return html`<tr-layout>${this.router.outlet()}</tr-layout>`;
	}
}
