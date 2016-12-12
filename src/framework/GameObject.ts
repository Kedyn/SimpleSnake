/*
 Dependencies:
 */
import {Vector2D} from "./Vector2D";
import {Drawing} from "./Drawing";

abstract class AnyGameObject {
    public constructor(public position: Vector2D) {}
}

class RectangularGameObject extends AnyGameObject {
    public constructor(public position: Vector2D, public width: number, public height: number) {
        super(position);
    }
}

class CircularGameObject extends AnyGameObject {
    public constructor(public position: Vector2D, public radius: number) {
        super(position);
    }
}

class PolyGameObject extends AnyGameObject {
    constructor(public initial_point: Vector2D, public end_points: Vector2D[]) {
        super(initial_point);
        end_points.unshift(initial_point);
    }
}

class GameObject {
    /*
     * constructor: constructs the game object
     * @id: string, a game object id.
     * @drawing: Drawing, the drawing associated with the object.
     */
    public constructor(public drawing: Drawing) {}

    /*
     * update: updates the object
     * no parameters
     */
    public update(): void {

    }

    /*
     * render: renders the object
     * no parameters
     */
    public render(): void {
        this.drawing.draw();
    }

    /*
     * cooInObject: returns true if a coordinate is in an object.
     * @coo
     */
    public cooInObject(coo: Vector2D): boolean {
        let x = this.drawing.object.position.x;
        let y = this.drawing.object.position.y;
        if ((<RectangularGameObject>this.drawing.object).width) {
            return (coo.x >= x &&
            coo.x <= x + (<RectangularGameObject>this.drawing.object).width &&
            coo.y >= y &&
            coo.y <= y + (<RectangularGameObject>this.drawing.object).height);
        }
        else if ((<CircularGameObject>this.drawing.object).radius) {
            return (Math.pow((<CircularGameObject>this.drawing.object).radius,2) <= Math.pow(coo.x - x,2) + Math.pow(coo.y - y,2));
        }
        else if ((<PolyGameObject>this.drawing.object).end_points.length) {
            x = coo.x;
            y = coo.y;
            let inside = false;
            for (let i = 0, j = (<PolyGameObject>this.drawing.object).end_points.length - 1; i < (<PolyGameObject>this.drawing.object).end_points.length; j = i++) {
                let xi = (<PolyGameObject>this.drawing.object).end_points[i].x;
                let yi = (<PolyGameObject>this.drawing.object).end_points[i].y;
                let xj = (<PolyGameObject>this.drawing.object).end_points[j].x;
                let yj = (<PolyGameObject>this.drawing.object).end_points[j].y;
                let intersect = ((yi > y) != (yj > y))
                    && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
                if (intersect) inside = !inside;
            }
            return inside;
        }
        return false;
    }
}

export {AnyGameObject, RectangularGameObject, CircularGameObject, PolyGameObject, GameObject};