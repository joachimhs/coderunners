function KikoraToolbox() {
    this.blocks = { "round_start": 1};

    this.generateToolbox = function(inputParams) {
        var toolbox = '<xml>';

        if (this.blocks.round_start) {
            toolbox += '<block type="round_start"></block>';
        }

        if (this.blocks.walk_forwards) {
            toolbox += '<block type="walk_forwards"></block>';
        }

        if (this.blocks.rotate) {
            toolbox += '<block type="rotate"></block>';
        }

        toolbox += '</xml>';

        /*toolbox = '<xml>';
        toolbox += '  <block type="round_start"></block>';
        toolbox += '  <block type="walk_forwards"></block>';
        toolbox += '  <block type="rotate"></block>';
        toolbox += '</xml>';*/

        return toolbox;
    };

    this.generateMaxInstances = function() {
        return this.blocks;
    };

    this.setBlocks = function(newBlocks) {
        this.blocks = newBlocks;
    }
}

/*
var toolbox = '<xml>';
        toolbox += '  <block type="round_start"></block>';
        toolbox += '  <block type="walk_forwards"></block>';
        toolbox += '  <block type="rotate"></block>';
        toolbox += '</xml>';

        return toolbox;
 */