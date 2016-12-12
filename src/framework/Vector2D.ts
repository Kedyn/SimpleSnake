class Vector2D {
    /*
     * constructor: constructs the vector instance
     * @x: number, the x coordinate of your vector
     * @y: number, the y coordinate of your vector
     */
    public constructor(public x: number, public y: number) {}

    /*
     * isEqual: returns true if both components of the vector match
     * @vector: the vector you want to compare te current vector with.
     */
    public isEqual(vector: Vector2D): boolean {
        return (this.x == vector.x && this.y == vector.y);
    }

    /*
     * length: returns the length of the vector
     * no parameters
     */
    public length(): number {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }

    /*
     * copy: copies a vector
     * @vector: Vector2D, the vector you wish the current vector to equal to.
     */
    public copy(vector: Vector2D): void {
        this.x = vector.x;
        this.y = vector.y;
    }

    /*
     * add: adds a vector to your current vector.
     * @vector: Vector2D, the vector you want to add to your current vector.
     */
    public add(vector: Vector2D): void {
        this.x += vector.x;
        this.y += vector.y;
    }

    /*
     * subtract: subtracts a vector to your current vector.
     * @vector: Vector2D, the vector you want to subtract to your current vector.
     */
    public subtract(vector: Vector2D): void {
        this.x -= vector.x;
        this.y -= vector.y;
    }

    /*
     * multiply: multiplies your current vector with a scalar.
     * @scalar: number, the scalar you want your current vector to be multiplied by.
     */
    public multiply(scalar: number): void {
        this.x *= scalar;
        this.y *= scalar;
    }

    /*
     * divide: divides your current vector by a scalar.
     * @scalar: number, the scalar you want your current vector to be divided by.
     */
    public divide(scalar: number): void {
        this.x /= scalar;
        this.y /= scalar;
    }

    /*
     * normalize: normalizes your current vector, sets your vector to a unit vector.
     * no parameters
     */
    public normalize(): void {
        let l = this.length();
        if (l > 0) {
            this.divide(l);
        }
    }
}

export {Vector2D};