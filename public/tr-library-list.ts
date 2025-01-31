import { Task } from '@lit/task';
import type { MediaLibrary } from 'knex/types/tables.js';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getLibraries } from './api.ts';

@customElement('tr-library-list')
export class TRLibraryList extends LitElement {
	private getLibrariesTask = new Task(this, {
		task: () => getLibraries(),
		args: () => [],
	});

	protected override render() {
		return html`
      <md-list>
        ${this.getLibrariesTask.render({
					complete: (libraries) =>
						libraries.map(
							(library) =>
								html`<md-list-item
                  href=${`/libraries/${library.id}`}
                  type="link"
                  >${library.path}</md-list-item
                >`,
						),
				})}
      </md-list>
    `;
	}
}
