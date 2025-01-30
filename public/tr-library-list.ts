import { Task } from '@lit/task';
import type { MediaLibrary } from 'knex/types/tables.js';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tr-library-list')
export class TRLibraryList extends LitElement {
	private libraryListTask = new Task<[], MediaLibrary[]>(this, {
		task: () =>
			fetch('/api/media_libraries').then((response) => response.json()),
		args: () => [],
	});

	protected override render() {
		return html`
      <md-list>
        ${this.libraryListTask.render({
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
