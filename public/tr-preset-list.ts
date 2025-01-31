import { Task } from '@lit/task';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { getPresets } from './api.ts';

@customElement('tr-preset-list')
export class TRPresetList extends LitElement {
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
								html`<md-list-item href=${`/libraries/${preset.id}`} type="link"
                  >${preset.name}</md-list-item
                >`,
						),
				})}
      </md-list>
    `;
	}
}
