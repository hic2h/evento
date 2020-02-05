import { Injectable } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private message: NzMessageService) {}

  private createMessage(options: { type: string; message: string }) {
    if (options.message) {
      this.message.create(options.type, options.message);
    }
  }

  /**
   * Display a success message with custom message
   */
  showSuccess(message: string) {
    this.createMessage({ message, type: "success" });
  }

  /**
   * Display an error message with custom message
   */
  showError(message: string) {
    this.createMessage({ message, type: "error" });
  }
}
