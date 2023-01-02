/* Interface for writers to something, api, clipboard, whatever! */
interface WriterI {
    write(somethingToWrite: string): void;
}

/* Implementation of Writer Interface */
class Writer implements WriterI {
    write(somethingToWrite: string): void {
        navigator.clipboard.writeText(somethingToWrite);
        document.title = somethingToWrite;
    }
}

/* Interface for Cards */
interface CardI {
    id: number,
    element: HTMLElement;
    render(placeToRender: HTMLElement): void,
    onClick(): void,
}

/* Implementation of Card Interface */
class Card implements CardI {
    id: number;
    element: HTMLElement;
    circle: CircleI;
    writer: WriterI;

    constructor(id: number, color: string) {
        this.id = id;
        /* strong coupling */
        this.circle = new Circle(color);
        this.writer = new Writer();
    }

    onClick = () => {
        this.writer.write(this.circle.getColor());
        try {
            this.element.classList.add("card--done--start");
            let paragraph = document.createElement("p");
            paragraph.innerText = "Copied";
            this.element.appendChild(paragraph);
        }
        catch {
            console.log("error with copying, sorry :(");
        }
    }

    render(placeToRender: HTMLElement): void {
        const toBeRenderedCard = document.createElement("article");
        this.element = toBeRenderedCard;
        this.element.classList.add("card");
        this.element.setAttribute("data-test", this.id.toString());
        this.element.style.borderBottom = `1rem solid ${this.circle.getColor()}`;
        this.circle.render(this.element);
        placeToRender.appendChild(this.element);
        this.element.onclick = this.onClick;
    }
}

interface CircleI {
    color: string;
    getColor(): string;
    render(placeToRender: HTMLElement): void,
}

class Circle implements CircleI {
    color: string;
    element: HTMLElement;

    constructor(color: string) {
        this.color = color;
    }

    getColor(): string {
        return this.color;
    }

    render(placeToRender: HTMLElement): void {
        const toBeRenderedFigure = document.createElement("figure");
        this.element = toBeRenderedFigure;
        this.element.style.background = this.color;
        toBeRenderedFigure.classList.add("circle");
        placeToRender.appendChild(toBeRenderedFigure);
    }
}

/* Main loop */
for (let i = 1; i <= 50; i++) {
    let element = new Card(i, `hsl(${i},100%,50%)`);
    element.render(document.getElementById("js--main")! as HTMLElement);
}
