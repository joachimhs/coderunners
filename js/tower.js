function Tower(column, row) {
    this.xPos = 0;
    this.yPos = 0;
    this.damage = 1;

    this.getDamage = function() {
        return this.damage;
    };

    this.draw = function() {
        this.xPos = (column*tileWidth) + (tileWidth/2);
        this.yPos = (row*tileHeight) + (tileHeight/2);
        var runner = this.runnerTarget;

        var angleDeg= 0;
        if (runner) {
            angleDeg = Math.atan2(runner.getPosition().y - this.yPos, runner.getPosition().x - this.xPos) * 180 / Math.PI;;
            angleDeg += 90;
        }

        push();

        translate(this.xPos, this.yPos);
        rotate(angleDeg);


        fill(255);
        stroke(0);
        ellipse(0, 0, (tileWidth-4), (tileHeight-4));

        triangle(-(tileWidth/3) + 4, (tileHeight/3) - 2,
            (tileWidth/3) - 4, (tileHeight/3) - 2,
            0, -(tileWidth/2) + 8);

        pop();

    };

    this.removeRunner = function() {
        this.runnerTarget = null;
    };

    this.isAt = function(atColumn, atRow) {
        return atColumn == column && atRow == row;
    };

    this.canHit = function(runner) {
        var distance = int(dist(runner.getPosition().x, runner.getPosition().y, this.xPos, this.yPos));

        var canHit = distance < (tileWidth * 2.2);

        if (canHit) {
            this.runnerTarget = runner;
        }

        return distance < (tileWidth * 2.2);
    }
}