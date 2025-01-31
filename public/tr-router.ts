import { Router } from '@lit-labs/router';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './tr-layout.ts';
import './tr-library-list.ts';
import './tr-library-files.ts';

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
          mediaLibraryId=${ifDefined(
						mediaLibraryId ? Number.parseInt(mediaLibraryId) : undefined,
					)}
        ></tr-library-files>`,
		},
	]);

	override render() {
		return html`<tr-layout>${this.router.outlet()}</tr-layout>`;
	}
}
