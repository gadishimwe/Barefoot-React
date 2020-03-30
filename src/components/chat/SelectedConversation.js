/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import ReactEmoji from 'react-emoji';
import { Divider, Fab, Toolbar, IconButton, Typography } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Message from './selectedConvDetails/Message';
import SendField from './selectedConvDetails/SendMessageField';
import { resetSelected } from '../../redux/actions/selectConversation';
import { SET_INPUT } from '../../redux/actions/actionTypes';
import { socket } from '../common/mainNavbar';
import { updateStatus } from '../../redux/actions/getChatUsersAction';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: theme.palette.white,
		maxWidth: '100%'
	},
	conversation: {
		flexGrow: 1,
		flexWrap: 'wrap',
		overflow: 'scroll'
	},
	messages: {
		padding: theme.spacing(2)
	},
	fab: {
		position: 'absolute',
		bottom: theme.spacing(5),
		right: theme.spacing(1)
	},
	toolbar: {
		backgroundColor: theme.palette.white
	},
	backButton: {
		marginRight: theme.spacing(2),
		'@media (min-width: 864px)': {
			display: 'none'
		}
	},
	user: {
		flexShrink: 0,
		flexGrow: 1
	},
	activity: {
		display: 'flex',
		alignItems: 'center'
	},
	statusBullet: {
		marginRight: theme.spacing(1)
	},
	h6: {
		color: '#263238',
		fontWeight: 500,
		fontSize: '15px',
		letterSpacing: '-0.05px',
		lineHeight: '20px'
	},
	body2: {
		color: '#546e7a',
		fontSize: '12px',
		letterSpacing: '-0.04px',
		lineHeight: '18px'
	},
	emojisContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		overflow: 'scroll',
		maxWidth: '100%',
		maxHeight: '50%'
	},
	emojiTitle: {
		paddingLeft: '10px',
		margin: '10px 0 0',
		color: '#546e7a',
		fontSize: '20px',
		letterSpacing: '-0.05px',
		lineHeight: '21px'
	},
	emojis: {
		fontSize: 20,
		padding: '5px 5px 3px'
	},
	emojiWrapper: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	close: {
		display: 'none'
	}
}));
const scrollBottom = () => {
	document.querySelector('#conv')
		? document.querySelector('#conv').scrollIntoView({ behavior: 'smooth', block: 'end' })
		: null;
};
const emojis = {
	smileys:
		'😀😁😂🤣😃😄😅😆😉😊😋😎😍😘🥰😗😙😚☺🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😝🤤😒😓😔😕🙃🤑😲☹️🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱🥵🥶😳🤪😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤠🤡🥳🥴🥺🤥🤫🤭🧐🤓😈👿👹👺💀👻👽🤖💩😺😸😹😻😼😽🙀😿😾',
	peopleAndFantasy:
		'👶👧🧒👦👩🧑👨👵🧓👴👲👳‍♀️👳‍♂️🧕🧔👱‍♂️👱‍♀️👨‍🦰👩‍🦰👨‍🦱👩‍🦱👨‍🦲👩‍🦲👨‍🦳👩‍🦳🦸‍♀️🦸‍♂️🦹‍♀️🦹‍♂️👮‍♀️👮‍♂️👷‍♀️👷‍♂️💂‍♀️💂‍♂️🕵️‍♀️🕵️‍♂️👩‍⚕️👨‍⚕️👩‍🌾👨‍🌾👩‍🍳👨‍🍳👩‍🎓👨‍🎓👩‍🎤👨‍🎤👩‍🏫👨‍🏫👩‍🏭👨‍🏭👩‍💻👨‍💻👩‍💼👨‍💼👩‍🔧👨‍🔧👩‍🔬👨‍🔬👩‍🎨👨‍🎨👩‍🚒👨‍🚒👩‍✈️👨‍✈️👩‍🚀👨‍🚀👩‍⚖️👨‍⚖️👰🤵👸🤴🤶🎅🧙‍♀️🧙‍♂️🧝‍♀️🧝‍♂️🧛‍♀️🧛‍♂️🧟‍♀️🧟‍♂️🧞‍♀️🧞‍♂️🧜‍♀️🧜‍♂️🧚‍♀️🧚‍♂️👼🤰🤱🙇‍♀️🙇‍♂️💁‍♀️💁‍♂️🙅‍♀️🙅‍♂️🙆‍♀️🙆‍♂️🙋‍♀️🙋‍♂️🤦‍♀️🤦‍♂️🤷‍♀️🤷‍♂️🙎‍♀️🙎‍♂️🙍‍♀️🙍‍♂️💇‍♀️💇‍♂️💆‍♀️💆‍♂️🧖‍♀️🧖‍♂️💅🤳💃🕺👯‍♀️👯‍♂️🕴🚶‍♀️🚶‍♂️🏃‍♀️🏃‍♂️👫👭👬💑👩‍❤️‍👩👨‍❤️‍👨💏👩‍❤️‍💋‍👩👨‍❤️‍💋‍👨👪👨‍👩‍👧👨‍👩‍👧‍👦👨‍👩‍👦‍👦👨‍👩‍👧‍👧👩‍👩‍👦👩‍👩‍👧👩‍👩‍👧‍👦👩‍👩‍👦‍👦👩‍👩‍👧‍👧👨‍👨‍👦👨‍👨‍👧👨‍👨‍👧‍👦👨‍👨‍👦‍👦👨‍👨‍👧‍👧👩‍👦👩‍👧👩‍👧‍👦👩‍👦‍👦👩‍👧‍👧👨‍👦👨‍👧👨‍👧‍👦👨‍👦‍👦👨‍👧‍👧🤲👐🙌👏🤝👍👎👊✊🤛🤜🤞✌️🤟🤘👌👈👉👆👇☝️✋🤚🖐🖖👋🤙💪🦵🦶🖕✍️🙏💍💄💋👄👅👂👃👣👁👀🧠🦴🦷🗣👤👥',
	clothingAndAccessories: '🧥👚👕👖👔👗👙👘👠👡👢👞👟🥾🥿🧦🧤🧣🎩🧢👒🎓⛑👑👝👛👜💼🎒👓🕶🥽🥼🌂🧵🧶',
	animalsAndNature:
		'🐶🐱🐭🐹🐰🦊🦝🐻🐼🦘🦡🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🦆🦢🦅🦉🦚🦜🦇🐺🐗🐴🦄🐝🐛🦋🐌🐚🐞🐜🦗🕷🕸🦂🦟🦠🐢🐍🦎🦖🦕🐙🦑🦐🦀🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🦍🐘🦏🦛🐪🐫🦙🦒🐃🐂🐄🐎🐖🐏🐑🐐🦌🐕🐩🐈🐓🦃🕊🐇🐁🐀🐿🦔🐾🐉🐲🌵🎄🌲🌳🌴🌱🌿☘️🍀🎍🎋🍃🍂🍁🍄🌾💐🌷🌹🥀🌺🌸🌼🌻🌞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏💫⭐️🌟✨⚡️☄️💥🔥🌪🌈☀️🌤⛅️🌥☁️🌦🌧⛈🌩🌨❄️☃️⛄️🌬💨💧💦☔️☂️🌊🌫',
	foodAndDrink:
		'🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥭🥥🥝🍅🍆🥑🥦🥒🥬🌶🌽🥕🥔🍠🥐🍞🥖🥨🥯🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🌮🌯🥗🥘🥫🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥮🥠🍢🍡🍧🍨🍦🥧🍰🎂🍮🍭🍬🍫🍿🧂🍩🍪🌰🥜🍯🥛🍼☕️🍵🥤🍶🍺🍻🥂🍷🥃🍸🍹🍾🥄🍴🍽🥣🥡🥢',
	activityAndSports:
		'⚽️🏀🏈⚾️🥎🏐🏉🎾🥏🎱🏓🏸🥅🏒🏑🥍🏏⛳️🏹🎣🥊🥋🎽⛸🥌🛷🛹🎿⛷🏂🏋️‍♀️🏋🏻‍♀️🏋🏼‍♀️🏋🏽‍♀️🏋🏾‍♀️🏋🏿‍♀️🏋️‍♂️🏋🏻‍♂️🏋🏼‍♂️🏋🏽‍♂️🏋🏾‍♂️🏋🏿‍♂️🤼‍♀️🤼‍♂️🤸‍♀️🤸🏻‍♀️🤸🏼‍♀️🤸🏽‍♀️🤸🏾‍♀️🤸🏿‍♀️🤸‍♂️🤸🏻‍♂️🤸🏼‍♂️🤸🏽‍♂️🤸🏾‍♂️🤸🏿‍♂️⛹️‍♀️⛹🏻‍♀️⛹🏼‍♀️⛹🏽‍♀️⛹🏾‍♀️⛹🏿‍♀️⛹️‍♂️⛹🏻‍♂️⛹🏼‍♂️⛹🏽‍♂️⛹🏾‍♂️⛹🏿‍♂️🤺🤾‍♀️🤾🏻‍♀️🤾🏼‍♀️🤾🏾‍♀️🤾🏾‍♀️🤾🏿‍♀️🤾‍♂️🤾🏻‍♂️🤾🏼‍♂️🤾🏽‍♂️🤾🏾‍♂️🤾🏿‍♂️🏌️‍♀️🏌🏻‍♀️🏌🏼‍♀️🏌🏽‍♀️🏌🏾‍♀️🏌🏿‍♀️🏌️‍♂️🏌🏻‍♂️🏌🏼‍♂️🏌🏽‍♂️🏌🏾‍♂️🏌🏿‍♂️🏇🏇🏻🏇🏼🏇🏽🏇🏾🏇🏿🧘‍♀️🧘🏻‍♀️🧘🏼‍♀️🧘🏽‍♀️🧘🏾‍♀️🧘🏿‍♀️🧘‍♂️🧘🏻‍♂️🧘🏼‍♂️🧘🏽‍♂️🧘🏾‍♂️🧘🏿‍♂️🏄‍♀️🏄🏻‍♀️🏄🏼‍♀️🏄🏽‍♀️🏄🏾‍♀️🏄🏿‍♀️🏄‍♂️🏄🏻‍♂️🏄🏼‍♂️🏄🏽‍♂️🏄🏾‍♂️🏄🏿‍♂️🏊‍♀️🏊🏻‍♀️🏊🏼‍♀️🏊🏽‍♀️🏊🏾‍♀️🏊🏿‍♀️🏊‍♂️🏊🏻‍♂️🏊🏼‍♂️🏊🏽‍♂️🏊🏾‍♂️🏊🏿‍♂️🤽‍♀️🤽🏻‍♀️🤽🏼‍♀️🤽🏽‍♀️🤽🏾‍♀️🤽🏿‍♀️🤽‍♂️🤽🏻‍♂️🤽🏼‍♂️🤽🏽‍♂️🤽🏾‍♂️🤽🏿‍♂️🚣‍♀️🚣🏻‍♀️🚣🏼‍♀️🚣🏽‍♀️🚣🏾‍♀️🚣🏿‍♀️🚣‍♂️🚣🏻‍♂️🚣🏼‍♂️🚣🏽‍♂️🚣🏾‍♂️🚣🏿‍♂️🧗‍♀️🧗🏻‍♀️🧗🏼‍♀️🧗🏽‍♀️🧗🏾‍♀️🧗🏿‍♀️🧗‍♂️🧗🏻‍♂️🧗🏼‍♂️🧗🏽‍♂️🧗🏾‍♂️🧗🏿‍♂️🚵‍♀️🚵🏻‍♀️🚵🏼‍♀️🚵🏽‍♀️🚵🏾‍♀️🚵🏿‍♀️🚵‍♂️🚵🏻‍♂️🚵🏼‍♂️🚵🏽‍♂️🚵🏾‍♂️🚵🏿‍♂️🚴‍♀️🚴🏻‍♀️🚴🏼‍♀️🚴🏽‍♀️🚴🏾‍♀️🚴🏿‍♀️🚴‍♂️🚴🏻‍♂️🚴🏼‍♂️🚴🏽‍♂️🚴🏾‍♂️🚴🏿‍♂️🏆🥇🥈🥉🏅🎖🏵🎗🎫🎟🎪🤹‍♀️🤹🏻‍♀️🤹🏼‍♀️🤹🏽‍♀️🤹🏾‍♀️🤹🏿‍♀️🤹‍♂️🤹🏻‍♂️🤹🏼‍♂️🤹🏽‍♂️🤹🏾‍♂️🤹🏿‍♂️🎭🎨🎬🎤🎧🎼🎹🥁🎷🎺🎸🎻🎲🧩♟🎯🎳🎮🎰',
	travelAndPlaces:
		'🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🚚🚛🚜🛴🚲🛵🏍🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉✈️🛫🛬🛩💺🛰🚀🛸🚁🛶⛵️🚤🛥🛳⛴🚢⚓️⛽️🚧🚦🚥🚏🗺🗿🗽🗼🏰🏯🏟🎡🎢🎠⛲️⛱🏖🏝🏜🌋⛰🏔🗻🏕⛺️🏠🏡🏘🏚🏗🏭🏢🏬🏣🏤🏥🏦🏨🏪🏫🏩💒🏛⛪️🕌🕍🕋⛩🛤🛣🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁',
	objects:
		'⌚️📱📲💻⌨️🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞☎️📟📠📺📻🎙🎚🎛⏱⏲⏰🕰⌛️⏳📡🔋🔌💡🔦🕯🗑🛢💸💵💴💶💷💰💳🧾💎⚖️🔧🔨⚒🛠⛏🔩⚙️⛓🔫💣🔪🗡⚔️🛡🚬⚰️⚱️🏺🧭🧱🔮🧿🧸📿💈⚗️🔭🧰🧲🧪🧫🧬🧯🔬🕳💊💉🌡🚽🚰🚿🛁🛀🛀🏻🛀🏼🛀🏽🛀🏾🛀🏿🧴🧵🧶🧷🧹🧺🧻🧼🧽🛎🔑🗝🚪🛋🛏🛌🖼🛍🧳🛒🎁🎈🎏🎀🎊🎉🧨🎎🏮🎐🧧✉️📩📨📧💌📥📤📦🏷📪📫📬📭📮📯📜📃📄📑📊📈📉🗒🗓📆📅📇🗃🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🔗📎🖇📐📏📌📍✂️🖊🖋✒️🖌🖍📝✏️🔍🔎🔏🔐🔒🔓',
	symbols:
		'❤️🧡💛💚💙💜🖤💔❣️💕💞💓💗💖💘💝💟☮️✝️☪️🕉☸️✡️🔯🕎☯️☦️🛐⛎♈️♉️♊️♋️♌️♍️♎️♏️♐️♑️♒️♓️🆔⚛️🉑☢️☣️📴📳🈶🈚️🈸🈺🈷️✴️🆚💮🉐㊙️㊗️🈴🈵🈹🈲🅰️🅱️🆎🆑🅾️🆘❌⭕️🛑⛔️📛🚫💯💢♨️🚷🚯🚳🚱🔞📵🚭❗️❕❓❔‼️⁉️🔅🔆〽️⚠️🚸🔱⚜️🔰♻️✅🈯️💹❇️✳️❎🌐💠Ⓜ️🌀💤🏧🚾♿️🅿️🈳🈂️🛂🛃🛄🛅🚹🚺🚼🚻🚮🎦📶🈁🔣ℹ️🔤🔡🔠🆖🆗🆙🆒🆕🆓0️⃣1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣🔟🔢#️⃣*️⃣⏏️▶️⏸⏯⏹⏺⏭⏮⏩⏪⏫⏬◀️🔼🔽➡️⬅️⬆️⬇️↗️↘️↙️↖️↕️↔️↪️↩️⤴️⤵️🔀🔁🔂🔄🔃🎵🎶➕➖➗✖️♾💲💱™️©️®️〰️➰➿🔚🔙🔛🔝🔜✔️☑️🔘⚪️⚫️🔴🔵🔺🔻🔸🔹🔶🔷🔳🔲▪️▫️◾️◽️◼️◻️⬛️⬜️🔈🔇🔉🔊🔔🔕📣📢👁‍🗨💬💭🗯♠️♣️♥️♦️🃏🎴🀄️🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧',
	flags:
		'🇦🇫🇦🇽🇦🇱🇩🇿🇦🇸🇦🇩🇦🇴🇦🇮🇦🇶🇦🇬🇦🇷🇦🇲🇦🇼🇦🇺🇦🇹🇦🇿🇧🇸🇧🇭🇧🇩🇧🇧🇧🇾🇧🇪🇧🇿🇧🇯🇧🇲🇧🇹🇧🇴🇧🇦🇧🇼🇧🇷🇮🇴🇻🇬🇧🇳🇧🇬🇧🇫🇧🇮🇰🇭🇨🇲🇨🇦🇮🇨🇨🇻🇧🇶🇰🇾🇨🇫🇹🇩🇨🇱🇨🇳🇨🇽🇨🇨🇨🇴🇰🇲🇨🇬🇨🇩🇨🇰🇨🇷🇨🇮🇭🇷🇨🇺🇨🇼🇨🇾🇨🇿🇩🇰🇩🇯🇩🇲🇩🇴🇪🇨🇪🇬🇸🇻🇬🇶🇪🇷🇪🇪🇪🇹🇪🇺🇫🇰🇫🇴🇫🇯🇫🇮🇫🇷🇬🇫🇵🇫🇹🇫🇬🇦🇬🇲🇬🇪🇩🇪🇬🇭🇬🇮🇬🇷🇬🇱🇬🇩🇬🇵🇬🇺🇬🇹🇬🇬🇬🇳🇬🇼🇬🇾🇭🇹🇭🇳🇭🇰🇭🇺🇮🇸🇮🇳🇮🇩🇮🇷🇮🇶🇮🇪🇮🇲🇮🇱🇮🇹🇯🇲🇯🇵🎌🇯🇪🇯🇴🇰🇿🇰🇪🇰🇮🇽🇰🇰🇼🇰🇬🇱🇦🇱🇻🇱🇧🇱🇸🇱🇷🇱🇾🇱🇮🇱🇹🇱🇺🇲🇴🇲🇰🇲🇬🇲🇼🇲🇾🇲🇻🇲🇱🇲🇹🇲🇭🇲🇶🇲🇷🇲🇺🇾🇹🇲🇽🇫🇲🇲🇩🇲🇨🇲🇳🇲🇪🇲🇸🇲🇦🇲🇿🇲🇲🇳🇦🇳🇷🇳🇵🇳🇱🇳🇨🇳🇿🇳🇮🇳🇪🇳🇬🇳🇺🇳🇫🇰🇵🇲🇵🇳🇴🇴🇲🇵🇰🇵🇼🇵🇸🇵🇦🇵🇬🇵🇾🇵🇪🇵🇭🇵🇳🇵🇱🇵🇹🇵🇷🇶🇦🇷🇪🇷🇴🇷🇺🇷🇼🇼🇸🇸🇲🇸🇦🇸🇳🇷🇸🇸🇨🇸🇱🇸🇬🇸🇽🇸🇰🇸🇮🇬🇸🇸🇧🇸🇴🇿🇦🇰🇷🇸🇸🇪🇸🇱🇰🇧🇱🇸🇭🇰🇳🇱🇨🇵🇲🇻🇨🇸🇩🇸🇷🇸🇿🇸🇪🇨🇭🇸🇾🇹🇼🇹🇯🇹🇿🇹🇭🇹🇱🇹🇬🇹🇰🇹🇴🇹🇹🇹🇳🇹🇷🇹🇲🇹🇨🇹🇻🇻🇮🇺🇬🇺🇦🇦🇪🇬🇧🇺🇳🇺🇸🇺🇾🇺🇿🇻🇺🇻🇦🇻🇪🇻🇳🇼🇫🇪🇭🇾🇪🇿🇲🇿🇼'
};
const flagsArray = Array.from(emojis.flags);
const flags = flagsArray.map((flag, index) => {
	if (index % 2 !== 0) return `${flag}${flagsArray[index + 1]}`;
});
const SelectedConversation = ({ conversation, currentUser, className, ...rest }) => {
	useEffect(() => {
		scrollBottom();
	}, [conversation]);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [isOnline, setIsOnline] = useState(conversation.chatUser.isOnline);
	const [lastSeen, setLastSeen] = useState(conversation.chatUser.lastActivity);
	useEffect(() => {
		setIsOnline(conversation.chatUser.isOnline);
		setLastSeen(conversation.chatUser.lastActivity);
	}, [conversation.chatUser.id]);
	const insertEmoji = e => {
		dispatch({ type: SET_INPUT, payload: e.target.innerHTML });
	};
	socket.on('user-connected', user => {
		if (conversation.chatUser.email === user.email) {
			setIsOnline(true);
			dispatch(
				updateStatus({
					userEmail: conversation.chatUser.email,
					status: true,
					lastActivity: lastSeen
				})
			);
		}
	});
	socket.on('user-disconnected', ({ userEmail, lastActivity }) => {
		if (conversation.chatUser.email === userEmail) {
			setIsOnline(false);
			setLastSeen(lastActivity);
			dispatch(
				updateStatus({
					userEmail: conversation.chatUser.email,
					status: false,
					lastActivity: lastSeen
				})
			);
		}
	});
	return (
		<div {...rest} className={clsx(classes.root, className)}>
			<Toolbar {...rest} className={classes.toolbar}>
				<IconButton
					className={classes.backButton}
					onClick={() => dispatch(resetSelected())}
					test-data='back'
				>
					<KeyboardBackspaceIcon />
				</IconButton>
				<div className={classes.user}>
					<Typography className={classes.h6}>
						{`${conversation.chatUser.firstName} ${conversation.chatUser.lastName}`}
					</Typography>
					<div className={classes.activity}>
						{isOnline ? (
							<>
								{/* <StatusBullet className={classes.statusBullet} color='success' size='small' /> */}
								<span
									style={{
										minHeight: 8,
										minWidth: 8,
										margin: 8,
										background: '#43a047',
										borderRadius: '50%'
									}}
								/>
								<Typography className={classes.body2}>Active now</Typography>
							</>
						) : (
							<Typography className={classes.body2}>
								{'Active '}
								{moment(lastSeen).fromNow()}
							</Typography>
						)}
					</div>
				</div>
			</Toolbar>
			<Divider />
			{/* <ConversationMessages messages={conversation.messages} /> */}
			<div {...rest} className={clsx(classes.conversation, className)}>
				<PerfectScrollbar>
					<div className={classes.messages} id='conv'>
						{conversation.messages.map(message => {
							return (
								<Message
									key={message.id}
									message={message}
									currentUser={currentUser}
									chatUser={conversation.chatUser}
								/>
							);
						})}
					</div>
				</PerfectScrollbar>
				<Fab
					aria-label='Scroll down'
					className={classes.fab}
					size='small'
					onClick={scrollBottom}
					style={{ background: '#f50057', color: 'white' }}
					role='presentation'
				>
					<KeyboardArrowDownIcon />
				</Fab>
			</div>
			<Divider />
			<div className={clsx({ [classes.emojisContainer]: true, [classes.close]: !open })}>
				<div>
					<p className={classes.emojiTitle}>Smileys</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.smileys)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji} test-data='emoji'>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>People and Fantasy</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.peopleAndFantasy)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Clothing and accessories</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.clothingAndAccessories)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Animals and Nature</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.animalsAndNature)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Food and Drink</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.foodAndDrink)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Activity and Sports</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.activityAndSports)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Travel and Places</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.travelAndPlaces)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Objects</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.objects)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Symbols</p>
					<div className={classes.emojiWrapper}>
						{[...Array.from(emojis.symbols)].map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
				<div>
					<p className={classes.emojiTitle}>Flags</p>
					<div className={classes.emojiWrapper}>
						{flags.map((emoji, i) => (
							<span key={i} className={classes.emojis} onClick={insertEmoji}>
								{ReactEmoji.emojify(emoji)}
							</span>
						))}
					</div>
				</div>
			</div>
			<SendField
				currentUser={currentUser}
				chatUser={conversation.chatUser}
				open={open}
				setOpen={setOpen}
			/>
		</div>
	);
};

export default SelectedConversation;
