import { Task } from '@lit/task';
import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getPresets } from './api.ts';

@customElement('tr-preset-list')
export class TRPresetList extends LitElement {
	static override styles = [
		css`
      md-fab {
        position: absolute;
        right: var(--md-sys-spacing-md);
        bottom: var(--md-sys-spacing-md);
      }
    `,
	];

	private getPresetsTask = new Task(this, {
		task: () => getPresets(),
		args: () => [],
	});

	protected override render() {
		return html`
      <md-list>
        ${this.getPresetsTask.render({
					complete: (presets) =>
						presets.map(
							(preset) =>
								html`<md-list-item href=${`/presets/${preset.id}`} type="link"
                  >${preset.name}</md-list-item
                >`,
						),
				})}
      </md-list>
      <a href="/presets/new">
        <md-fab><md-icon slot="icon">add</md-icon></md-fab>
      </a>
    `;
	}
}
