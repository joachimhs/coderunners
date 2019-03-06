Blockly.Blocks['round_start'] = {
  init: function() {
    this.appendStatementInput("NAME")
        .setCheck(null)
        .appendField("Når runden starter");
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.JavaScript['round_start'] = function(block) {
  var statements_name = Blockly.JavaScript.statementToCode(block, 'NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = statements_name + '\n';
  return code;
};

Blockly.Blocks['walk_forwards'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Gå fremover");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['walk_forwards'] = function(block) {
    // TODO: Assemble JavaScript into code variable.
        var code = 'spillet.spiller.moveForward();\n';
        //code += 'spillet.addPauseFrames(30);\n';

    return code;
};

Blockly.Blocks['rotate'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("roter spiller ")
            .appendField(new Blockly.FieldDropdown([["-90","-90"], ["90","90"]]), "deg")
            .appendField("grader");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['rotate'] = function(block) {
    var dropdown_deg = block.getFieldValue('deg')
    // TODO: Assemble JavaScript into code variable.
    var code = 'spillet.spiller.rotate(' + dropdown_deg + ');\n';
    return code;
};