import { init, SdkError, SdkHandle, SdkOptions } from 'onfido-sdk-ui';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class OnfidoService implements OnDestroy {
  private onfido: SdkHandle = null;
  private readonly baseSdkOptions: SdkOptions = {
    useModal: true,
    containerId: 'onfido-mount',
    onModalRequestClose: () => this.close(),
  };

  initialize() {
    if (!this.onfido) {
      this.onfido = init(this.baseSdkOptions);
    }
  }

  open(token: string, success: () => void) {
    debugger;
    this.initialize();
    this.onfido.setOptions({
      token,
      isModalOpen: true,
      onError: (error: SdkError) => {
        debugger;
      },
      onComplete: (data) => {
        debugger;
        success();
        this.close();
      },

      steps: [
        {
          type: 'document',
          options: {
            forceCrossDevice: true,
            useLiveDocumentCapture: false,
          },
        },
        {
          type: 'face',
          options: {
            requestedVariant: 'video',
            uploadFallback: true,
            photoCaptureFallback: false,
          },
        },
      ],
    });
  }

  close() {
    if (this.onfido) {
      this.onfido.setOptions({ isModalOpen: false });
      this.onfido.tearDown();
      this.onfido = null;
    }
  }

  ngOnDestroy() {
    this.close();
  }
}
