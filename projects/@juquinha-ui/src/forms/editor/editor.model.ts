export interface CommandGroup {
  commands: EditorCommand[];
}

export interface EditorCommand {
  icon: string;
  name: string;
  description: string;
}
