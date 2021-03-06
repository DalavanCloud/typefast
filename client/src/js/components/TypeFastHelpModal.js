/**
 * Copyright (c) 2016-present, Facebook, Inc. All rights reserved.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * @flow
 */

import type { Element } from 'react';

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table';

class TypeFastHelpModal extends React.Component {

  render(): Element<any> {
    const actions = [
      <FlatButton
        label="Cancel"
        secondary={true}
        keyboardFocused={true}
        onTouchTap={this.props.onHide}
      />,
    ];
    return (
      <Dialog
        autoScrollBodyContent={true}
        title="Help"
        actions={actions}
        modal={false}
        open={this.props.isShowing}
        onRequestClose={this.props.onHide}
        bodyStyle={{paddingBottom: '0px'}}
        titleStyle={{marginBottom: '0px'}}
        actionsContainerStyle={{marginTop: '0px'}}
      >
        <Table selectable={false}>
          <TableBody displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>Ctrl-N</TableRowColumn>
              <TableRowColumn>Auto Complete word</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Ctrl-/</TableRowColumn>
              <TableRowColumn>Toogle comment</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Ctrl-I</TableRowColumn>
              <TableRowColumn>Show Type</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Ctrl-O</TableRowColumn>
              <TableRowColumn>Show Docs</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Alt-.</TableRowColumn>
              <TableRowColumn>Jump To Definition</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Alt-,</TableRowColumn>
              <TableRowColumn>Jump Back</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Ctrl-Q</TableRowColumn>
              <TableRowColumn>Rename</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Ctrl-.</TableRowColumn>
              <TableRowColumn>Select Name</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
    );
  }
}

module.exports = TypeFastHelpModal;
