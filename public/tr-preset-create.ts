import { LitElement, css, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';

@customElement('tr-preset-create')
export class TRPresetCreate extends LitElement {
	static override styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: var(--md-sys-spacing-sm);
    }
    [name='data'] {
      --md-filled-text-field-input-text-font: monospace;
    }
    md-fab {
      position: absolute;
      right: var(--md-sys-spacing-md);
      bottom: var(--md-sys-spacing-md);
    }
  `;

	@query('form')
	private accessor $form: HTMLFormElement | undefined;

	private submitForm() {
		this.$form?.requestSubmit();
	}

	private createPreset(e: SubmitEvent) {
		e.preventDefault();
		console.log('submit');
	}

	protected override render() {
		return html`
      <form @submit=${this.createPreset}>
        <md-filled-text-field
          label="Name"
          name="name"
          required
        ></md-filled-text-field>
        <md-filled-text-field
          required
          name="data"
          label="Data"
          type="textarea"
          rows="10"
        ></md-filled-text-field>
      </form>
      <md-fab @click=${this.submitForm}>
        <md-icon slot="icon">save</md-icon>
      </md-fab>
    `;
	}
}
