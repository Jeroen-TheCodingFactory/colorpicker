/* Implementation of Writer Interface */
var Writer = /** @class */ (function () {
    function Writer() {
    }
    Writer.prototype.write = function (somethingToWrite) {
        navigator.clipboard.writeText(somethingToWrite);
        document.title = somethingToWrite;
    };
    return Writer;
}());
/* Implementation of Card Interface */
var Card = /** @class */ (function () {
    function Card(id, color) {
        var _this = this;
        this.onClick = function () {
            _this.writer.write(_this.circle.getColor());
            try {
                _this.element.classList.add("card--done--start");
                var paragraph = document.createElement("p");
                paragraph.innerText = "Copied";
                _this.element.appendChild(paragraph);
            }
            catch (_a) {
                console.log("error with copying, sorry :(");
            }
        };
        this.id = id;
        /* strong coupling */
        this.circle = new Circle(color);
        this.writer = new Writer();
    }
    Card.prototype.render = function (placeToRender) {
        var toBeRenderedCard = document.createElement("article");
        this.element = toBeRenderedCard;
        this.element.classList.add("card");
        this.element.setAttribute("data-test", this.id.toString());
        this.element.style.borderBottom = "1rem solid ".concat(this.circle.getColor());
        this.circle.render(this.element);
        placeToRender.appendChild(this.element);
        this.element.onclick = this.onClick;
    };
    return Card;
}());
var Circle = /** @class */ (function () {
    function Circle(color) {
        this.color = color;
    }
    Circle.prototype.getColor = function () {
        return this.color;
    };
    Circle.prototype.render = function (placeToRender) {
        var toBeRenderedFigure = document.createElement("figure");
        this.element = toBeRenderedFigure;
        this.element.style.background = this.color;
        toBeRenderedFigure.classList.add("circle");
        placeToRender.appendChild(toBeRenderedFigure);
    };
    return Circle;
}());
/* Main loop */
for (var i = 1; i <= 50; i++) {
    var randomHue = Math.floor(Math.random() * (360 - 1 + 1)) + 1;
    var randomSaturation = Math.floor(Math.random() * (70 - 20 + 1)) + 20 + "%";
    var randomLightness = Math.floor(Math.random() * (80 - 20 + 1)) + 20 + "%";
    console.log(randomSaturation);
    // Math.floor(Math.random() * (max - min + 1)) + min;
    var element = new Card(i, "hsl(".concat(randomHue, ",").concat(randomSaturation, ",").concat(randomLightness, ")"));
    element.render(document.getElementById("js--main"));
}
