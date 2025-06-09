export class Project {
  constructor(
    private _id: number,
    private _title: string,
    private _author: string,
    private _date: string,
    private _tags: string[],
    private _roles: string[]
  ) {}

  // Getters
  get id(): number { return this._id; }
  get title(): string { return this._title; }
  get author(): string { return this._author; }
  get date(): string { return this._date; }
  get tags(): string[] { return [...this._tags]; }
  get roles(): string[] { return [...this._roles]; }

  // Methods
  matchesSearchTerm(term: string): boolean {
    return term.split('').every(char => 
      this._title.toLowerCase().includes(char.toLowerCase())
    );
  }

  hasTag(tag: string): boolean {
    return this._tags.includes(tag);
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      date: this._date,
      tags: [...this._tags],
      roles: [...this._roles]
    };
  }
} 