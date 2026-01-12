// Calendar Premaker (uk)
// Horisontal Orientation
// Euro Style (Monday first)

// version 0.3.2
// (c) vd
// ai-js@mail.ru 



var sMS_EN = "January,February,March,April,May,June,July,August,September,October,November,December";
var sMS_ID = "Januari,Februari,Maret,April,Mei,Juni,Juli,Agustus,September,Oktober,November,Desember";
var sDS_EN = "Mon,Tue,Wed,Thu,Fri,Sat,Sun";
var sDS_ID = "Sen,Sel,Rab,Kam,Jum,Sab,Min";

var sHS = "1/1,8/3,1/5,25/12";

var pMS = "Enter names for months (by comma)\nOr leave unchanged";
var pDS = "Enter names for days of week (by comma)\nOr leave unchanged";
var pHS = "Enter holidays, like this D/M[,D/M,D/M...]";

var AppCap = "Calendar Premaker (for Adobe Illustrator CS)\n\n";
var iStr = "To correct appearance use:\n\n" +
	"Window -> Type -> Paragraph Styles\n" +
	"Window -> Type -> Character Styles\n" +
	"Window -> Swatches\n\n";
// Variables for settings
// Encapsulate in a function to clean up global scope
(function main() {

	// Variables for settings
	var Year = new Date().getFullYear();
	var lang = "EN";
	var startDay = "Mon";
	var sMS = sMS_EN;
	var sDS = sDS_EN;
	var sHS = "1/1,8/3,1/5,25/12";
	var gapX = 0;
	var gapY = 0;

	// Parsed Data
	var MC = [];
	var DC = [];
	var HD = [];

	// UI Dialog function
	function showSettingsDialog() {
		var win = new Window('dialog', 'Calendar Premaker Settings');
		win.alignChildren = 'fill';
		win.orientation = 'column';

		// --- General Settings ---
		var pnlGeneral = win.add('panel', undefined, 'General Settings');
		pnlGeneral.alignChildren = 'left';
		pnlGeneral.orientation = 'column';

		// Year
		var grpYear = pnlGeneral.add('group');
		grpYear.add('statictext', undefined, 'Year:');
		var txtYear = grpYear.add('edittext', undefined, Year);
		txtYear.characters = 10;
		txtYear.active = true;

		// Language
		var grpLang = pnlGeneral.add('group');
		grpLang.add('statictext', undefined, 'Language:');
		var radioEn = grpLang.add('radiobutton', undefined, 'English');
		var radioId = grpLang.add('radiobutton', undefined, 'Bahasa Indonesia');
		radioEn.value = true;

		// Start Day
		var grpDay = pnlGeneral.add('group');
		grpDay.add('statictext', undefined, 'Start Day:');
		var radioMon = grpDay.add('radiobutton', undefined, 'Monday');
		var radioSun = grpDay.add('radiobutton', undefined, 'Sunday');
		radioMon.value = true;

		// Gap Settings
		var pnlLayout = win.add('panel', undefined, 'Layout Settings');
		pnlLayout.alignChildren = 'left';
		pnlLayout.orientation = 'column';

		var gapOptions = ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

		var grpGap = pnlLayout.add('group');
		grpGap.add('statictext', undefined, 'Gap X:');
		var ddGapX = grpGap.add('dropdownlist', undefined, gapOptions);
		ddGapX.selection = 0;
		grpGap.add('statictext', undefined, 'Gap Y:');
		var ddGapY = grpGap.add('dropdownlist', undefined, gapOptions);
		ddGapY.selection = 0;

		// --- Customization ---
		var pnlCust = win.add('panel', undefined, 'Customization');
		pnlCust.alignChildren = 'fill';
		pnlCust.orientation = 'column';

		// Months
		pnlCust.add('statictext', undefined, 'Months (comma separated):');
		var txtMonths = pnlCust.add('edittext', undefined, sMS_EN, { multiline: true });
		txtMonths.preferredSize.height = 40;

		// Days
		pnlCust.add('statictext', undefined, 'Days (comma separated):');
		var txtDays = pnlCust.add('edittext', undefined, sDS_EN);

		// Holidays
		pnlCust.add('statictext', undefined, 'Holidays (D/M, comma separated):');
		var txtHolidays = pnlCust.add('edittext', undefined, sHS);

		// --- Event Listeners for Dynamic Updates ---
		function updateFields() {
			var isID = radioId.value;
			var isSun = radioSun.value;

			// Determine base strings
			var baseMS = isID ? sMS_ID : sMS_EN;
			var baseDS = isID ? sDS_ID : sDS_EN;

			// Update Months
			txtMonths.text = baseMS;

			// Update Days based on Start Day
			var dcArr = baseDS.split(',');
			if (isSun) {
				var last = dcArr.pop();
				dcArr.unshift(last);
			}
			txtDays.text = dcArr.join(',');
		}

		radioEn.onClick = updateFields;
		radioId.onClick = updateFields;
		radioMon.onClick = updateFields;
		radioSun.onClick = updateFields;

		// Buttons
		var grpBtns = win.add('group');
		grpBtns.alignment = 'center';
		var btnOK = grpBtns.add('button', undefined, 'OK');
		var btnCancel = grpBtns.add('button', undefined, 'Cancel');

		if (win.show() == 1) {
			Year = parseInt(txtYear.text);
			if (isNaN(Year)) Year = new Date().getFullYear();

			lang = radioId.value ? "ID" : "EN";
			startDay = radioSun.value ? "Sun" : "Mon";

			gapX = parseInt(ddGapX.selection.text);
			gapY = parseInt(ddGapY.selection.text);

			// Capture Customization
			sMS = txtMonths.text;
			sDS = txtDays.text;
			sHS = txtHolidays.text;

			return true;
		}
		return false;
	}

	if (showSettingsDialog()) {
		if (Year > 2000 && Year < 2100) {
			// Process Months
			if (sMS) {
				MC = sMS.split(',', 12);
				for (var i = 0; i < 12; i++) if (MC[i] == null) MC.push(' ');
				for (var i = 0; i < 12; i++) if (MC[i] == '') MC[i] = ' ';

				// Process Days
				if (sDS) {
					DC = sDS.split(',', 7);
					for (var i = 0; i < 7; i++) if (DC[i] == null) DC.push(' ');
					for (var i = 0; i < 7; i++) if (DC[i] == '') DC[i] = ' ';

					// Process Holidays
					if (sHS == '') sHS = ' ';
					if (sHS) {
						var HC = sHS.split(',');
						for (var i = 0; i < HC.length; i++) {
							var DM = HC[i].split('/');
							if (DM.length > 1) HD.push(DM[0], DM[1]);
						}

						makeCalendar();
					}
				}
			}
		} else {
			alert("Please enter a valid year between 2001 and 2100.");
		}
	}

	function makeCalendar() {
		var CellHeight = 20;
		var CellWidth = 30;
		var unitH = CellHeight + gapY;
		var unitW = CellWidth + gapX;

		// Calculate days in February for leap years properly
		var febDays = (new Date(Year, 1, 29).getMonth() == 1) ? 29 : 28;
		var MN = Array(31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

		// Determine First Day offset
		var dateFirst = new Date(Year, 0, 1);
		var jsDay = dateFirst.getDay(); // 0=Sun, 1=Mon...

		var isSunStart = (startDay.toLowerCase() == "sun" || startDay.toLowerCase() == "min");

		var FirstDay;
		if (isSunStart) {
			FirstDay = jsDay;
		} else {
			FirstDay = (jsDay + 6) % 7;
		}

		var FD = FirstDay;
		var DocTop = unitH * 52;
		var docRef = documents.add(DocumentColorSpace.CMYK, unitW * 18, DocTop + unitH * 3);

		// Processing Indicator
		var waitRef = docRef.textFrames.add();
		waitRef.contents = "Processing...";
		waitRef.top = DocTop;
		waitRef.left = 10;
		waitRef.height = 100;
		waitRef.width = 300;
		redraw();

		docRef.swatches.removeAll();
		try { docRef.characterStyles.removeAll() } catch (e) { }

		var nColor = new CMYKColor();
		var nSpotColor = new SpotColor();

		var DefaultSpot = docRef.spots.add();
		nColor.cyan = 90;
		nColor.magenta = 60;
		nColor.yellow = 0;
		nColor.black = 0;
		DefaultSpot.name = "Week day color";
		DefaultSpot.colorType = ColorModel.PROCESS;
		DefaultSpot.color = nColor;

		var HolidaySpot = docRef.spots.add();
		nColor.cyan = 0;
		nColor.magenta = 90;
		nColor.yellow = 60;
		nColor.black = 0;
		HolidaySpot.name = "Holiday color";
		HolidaySpot.colorType = ColorModel.PROCESS;
		HolidaySpot.color = nColor;

		var DaySpot = docRef.spots.add();
		nColor.cyan = 0;
		nColor.magenta = 0;
		nColor.yellow = 0;
		nColor.black = 70;
		DaySpot.name = "Color of caption of week day";
		DaySpot.colorType = ColorModel.PROCESS;
		DaySpot.color = nColor;

		var HolydayDaySpot = docRef.spots.add();
		nColor.cyan = 0;
		nColor.magenta = 60;
		nColor.yellow = 20;
		nColor.black = 50;
		HolydayDaySpot.name = "Color of caption of weekend";
		HolydayDaySpot.colorType = ColorModel.PROCESS;
		HolydayDaySpot.color = nColor;

		var CaptionSpot = docRef.spots.add();
		nColor.cyan = 0;
		nColor.magenta = 0;
		nColor.yellow = 0;
		nColor.black = 100;
		CaptionSpot.name = "Color of caption of month";
		CaptionSpot.colorType = ColorModel.PROCESS;
		CaptionSpot.color = nColor;


		var charAttr;
		var paraAttr;
		var DefaultStyle = docRef.characterStyles.add("Week day");
		var HolidayStyle = docRef.characterStyles.add("Holyday");
		var DayCapStyle = docRef.characterStyles.add("Caption of week day");
		var HolydayCapStyle = docRef.characterStyles.add("Caption of weekend");
		var CaptionsStyle = docRef.characterStyles.add("Caption of month");

		charAttr = DefaultStyle.characterAttributes;
		nSpotColor.spot = DefaultSpot;
		charAttr.fillColor = nSpotColor;

		charAttr = HolidayStyle.characterAttributes;
		nSpotColor.spot = HolidaySpot;
		charAttr.fillColor = nSpotColor;

		charAttr = DayCapStyle.characterAttributes;
		nSpotColor.spot = DaySpot;
		charAttr.fillColor = nSpotColor;

		charAttr = HolydayCapStyle.characterAttributes;
		nSpotColor.spot = HolydayDaySpot;
		charAttr.fillColor = nSpotColor;

		charAttr = CaptionsStyle.characterAttributes;
		nSpotColor.spot = CaptionSpot;
		charAttr.fillColor = nSpotColor;


		var paraDayStyle = docRef.paragraphStyles.add("Dates");
		paraAttr = paraDayStyle.paragraphAttributes;
		paraAttr.justification = Justification.RIGHT;

		var paraWeekDayStyle = docRef.paragraphStyles.add("Days of week");
		paraAttr = paraWeekDayStyle.paragraphAttributes;
		paraAttr.justification = Justification.RIGHT;

		// Month Name aligned Left
		var paraMonthStyle = docRef.paragraphStyles.add("Months");
		paraAttr = paraMonthStyle.paragraphAttributes;
		paraAttr.justification = Justification.LEFT;

		// Year aligned Right
		var paraYearStyle = docRef.paragraphStyles.add("Year");
		paraAttr = paraYearStyle.paragraphAttributes;
		paraAttr.justification = Justification.RIGHT;


		var LeftMargin = unitW;
		var textRef;
		var yearRef;

		// Loop for first 6 months
		for (var m = 0; m < 6; m++) {
			var blockTop = DocTop - m * 9 * unitH; // Base Y for this block's date rows

			// Header Vertical Position:
			// Weekday Row is at `blockTop + unitH`.
			// We want fixed distance above Weekday Row, regardless of gapY.
			var headerTop = blockTop + unitH + 30; // Fixed 30pt offset above Weekdays

			// Month Name (Left)
			textRef = docRef.textFrames.add();
			textRef.contents = MC[m];
			textRef.top = headerTop;
			textRef.left = LeftMargin; // Aligned with the Start of the Grid
			CaptionsStyle.applyTo(textRef.textRange);
			paraMonthStyle.applyTo(textRef.paragraphs[0], true);

			// Year (Right)
			yearRef = docRef.textFrames.add();
			yearRef.contents = Year;
			CaptionsStyle.applyTo(yearRef.textRange);
			paraYearStyle.applyTo(yearRef.paragraphs[0], true);

			var gridRightEdge = LeftMargin + (6 * unitW) + CellWidth;
			yearRef.top = headerTop;
			yearRef.left = gridRightEdge - yearRef.width;

			for (var i = 0; i < 7; i++) {
				textRef = docRef.textFrames.add();
				textRef.contents = DC[i];
				textRef.top = blockTop + unitH;
				textRef.left = i * unitW + LeftMargin;
				var styleToApply = (i < 6) ? DayCapStyle : HolydayCapStyle;
				styleToApply.applyTo(textRef.textRange);
				paraWeekDayStyle.applyTo(textRef.paragraphs[0], true);
			}
			for (var d = 0; d < MN[m]; d++) {
				textRef = docRef.textFrames.add();
				textRef.contents = d + 1;
				textRef.top = blockTop - (Math.floor((FD + d) / 7) * unitH);
				textRef.left = (FD + d) % 7 * unitW + LeftMargin;
				paraDayStyle.applyTo(textRef.paragraphs[0], true);

				if (isHoliday(d + 1, m + 1) || ((FD + d) % 7 == 6)) {
					HolidayStyle.applyTo(textRef.textRange);
				} else {
					DefaultStyle.applyTo(textRef.textRange);
				}
			}
			FD = (FD + d) % 7;
		}

		LeftMargin = unitW * 9;

		// Loop for last 6 months
		for (var m = 6; m < 12; m++) {
			var blockTop = DocTop - (m - 6) * 9 * unitH;

			var headerTop = blockTop + unitH + 30;

			// Month Name
			textRef = docRef.textFrames.add();
			textRef.contents = MC[m];
			textRef.top = headerTop;
			textRef.left = LeftMargin;
			CaptionsStyle.applyTo(textRef.textRange);
			paraMonthStyle.applyTo(textRef.paragraphs[0], true);

			// Year
			yearRef = docRef.textFrames.add();
			yearRef.contents = Year;
			CaptionsStyle.applyTo(yearRef.textRange);
			paraYearStyle.applyTo(yearRef.paragraphs[0], true);

			var gridRightEdge = LeftMargin + (6 * unitW) + CellWidth;
			yearRef.top = headerTop;
			yearRef.left = gridRightEdge - yearRef.width;

			for (var i = 0; i < 7; i++) {
				textRef = docRef.textFrames.add();
				textRef.contents = DC[i];
				textRef.top = blockTop + unitH;
				textRef.left = i * unitW + LeftMargin;
				var styleToApply = (i < 6) ? DayCapStyle : HolydayCapStyle;
				styleToApply.applyTo(textRef.textRange);
				paraWeekDayStyle.applyTo(textRef.paragraphs[0], true);
			}
			for (var d = 0; d < MN[m]; d++) {
				textRef = docRef.textFrames.add();
				textRef.contents = d + 1;
				textRef.top = blockTop - (Math.floor((FD + d) / 7) * unitH);
				textRef.left = (FD + d) % 7 * unitW + LeftMargin;
				paraDayStyle.applyTo(textRef.paragraphs[0], true);

				if (isHoliday(d + 1, m + 1) || ((FD + d) % 7 == 6)) {
					HolidayStyle.applyTo(textRef.textRange);
				} else {
					DefaultStyle.applyTo(textRef.textRange);
				}
			}
			FD = (FD + d) % 7;
		}

		waitRef.remove();
		redraw();

		alert(iStr);
	}

	function isHoliday(day, month) {
		for (var i = 0; i < HD.length; i += 2) {
			if (day == HD[i] && month == HD[i + 1]) return true;
		}
		return false;
	}
})();
