import { Task } from '@lit/task';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getLibraryFiles } from './api.ts';
import { getHumanFileSize, getHumanVideoSize } from './utils/files.ts';

const humanVideoSizeToIcon = {
	SD: 'SD',
	HD: 'HD',
	FHD: 'Full_HD',
	UHD: '4k',
};

const videoCodecToIcon: Record<string, string> = {
	h264: 'avc',
	h265: 'hevc',
};

@customElement('tr-library-files')
export class TRLibraryFiles extends LitElement {
	private getLibraryFilesTask = new Task(this, {
		task: () => getLibraryFiles(this.mediaLibraryId),
		args: () => [this.mediaLibraryId],
	});

	@property({ type: Number })
	accessor mediaLibraryId = 0;

	protected override render() {
		return html`
      <md-list>
        ${this.getLibraryFilesTask.render({
					complete: (files) =>
						files.map(
							(file) => html`
                <md-list-item>
                  <md-icon slot="start">
                    ${
											humanVideoSizeToIcon[
												getHumanVideoSize(file.videoWidth, file.videoHeight)
											]
										}
                  </md-icon>
                  <md-icon slot="start">
                    ${videoCodecToIcon[file.videoCodec] ?? ''}
                  </md-icon>
                  ${file.filepath}
                  <div slot="end">
                    ${getHumanFileSize(file.sizeBytes, true)}
                  </div>
                </md-list-item>
              `,
						),
				})}
      </md-list>
    `;
	}
}
