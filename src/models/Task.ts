export class Task {
    private id: number;
    private category: string;
    private description: string;
    private priorityLevel: number;
    private approximateDuration: number;

    constructor(id: number, category: string, description: string, priorityLevel: number, approximateDuration: number) {
        this.id = id;
        this.category = category;
        this.description = description;
        this.priorityLevel = priorityLevel;
        this.approximateDuration = approximateDuration;
    }

    getId(): number {
        return this.id;
    }

    setId(id: number): void {
        this.id = id;
    }

    getCategory(): string {
        return this.category;
    }

    setCategory(category: string): void {
        this.category = category;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string): void {
        this.description = description;
    }

    getPriorityLevel(): number {
        return this.priorityLevel;
    }

    setPriorityLevel(priorityLevel: number): void {
        this.priorityLevel = priorityLevel;
    }

    getApproximateDuration(): number {
        return this.approximateDuration;
    }

    setApproximateDuration(approximateDuration: number): void {
        this.approximateDuration = approximateDuration;
    }
}