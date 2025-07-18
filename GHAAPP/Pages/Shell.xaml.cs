﻿using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Media.Animation;
using Microsoft.UI.Xaml.Navigation;

namespace GHAAPP.Pages;

public sealed partial class Shell : Page
{
    public Shell()
    {
        InitializeComponent();
        NavView.SelectedItem = NavView.MenuItems.OfType<NavigationViewItem>().First();
        ContentFrame.Navigate(
            typeof(HomePage),
            null,
            new EntranceNavigationTransitionInfo()
        );
    }
    public string AppTitleText
    {
        get
        {
#if DEBUG
            return "GitHub Actions Widget Dev";
#else
            return "GitHub Actions Widget";
#endif
        }
    }

    private double NavViewCompactModeThresholdWidth
    {
        get { return NavView.CompactModeThresholdWidth; }
    }

    private void ContentFrame_NavigationFailed(object sender, NavigationFailedEventArgs e)
    {
        throw new Exception("Failed to load Page " + e.SourcePageType.FullName);
    }

    private void NavView_Loaded(object sender, RoutedEventArgs e)
    {
        ContentFrame.Navigated += On_Navigated;

        NavView.SelectedItem = NavView.MenuItems[0];
        NavView_Navigate(typeof(HomePage), new EntranceNavigationTransitionInfo());
        Init_Title();
    }

    private void NavView_ItemInvoked(NavigationView sender,
        NavigationViewItemInvokedEventArgs args)
    {
        if (args.IsSettingsInvoked == true)
        {
            NavView_Navigate(typeof(SettingsPage), args.RecommendedNavigationTransitionInfo);
        }
        else if (args.InvokedItemContainer != null)
        {
            Type navPageType = Type.GetType(args.InvokedItemContainer.Tag.ToString());
            NavView_Navigate(navPageType, args.RecommendedNavigationTransitionInfo);
        }
    }

    private void NavView_SelectionChanged(NavigationView sender,
        NavigationViewSelectionChangedEventArgs args)
    {
        if (args.IsSettingsSelected == true)
        {
            NavView_Navigate(typeof(SettingsPage), args.RecommendedNavigationTransitionInfo);
        }
        else if (args.SelectedItemContainer != null)
        {
            Type navPageType = Type.GetType(args.SelectedItemContainer.Tag.ToString());
            NavView_Navigate(navPageType, args.RecommendedNavigationTransitionInfo);
        }
    }

    private void NavView_Navigate(
        Type navPageType,
        NavigationTransitionInfo transitionInfo)
    {
        Type preNavPageType = ContentFrame.CurrentSourcePageType;

        if (navPageType is not null && !Type.Equals(preNavPageType, navPageType))
        {
            ContentFrame.Navigate(navPageType, null, transitionInfo);
        }
    }

    private void NavView_BackRequested(NavigationView sender,
        NavigationViewBackRequestedEventArgs args)
    {
        TryGoBack();
    }

    private bool TryGoBack()
    {
        if (!ContentFrame.CanGoBack)
            return false;

        if (NavView.IsPaneOpen &&
            (NavView.DisplayMode == NavigationViewDisplayMode.Compact ||
             NavView.DisplayMode == NavigationViewDisplayMode.Minimal))
            return false;

        ContentFrame.GoBack();
        return true;
    }

    private void Init_Title()
    {
        NavView.IsBackEnabled = ContentFrame.CanGoBack;
        NavView.SelectedItem = NavView.MenuItems
            .OfType<NavigationViewItem>()
            .First(i => i.Tag.Equals(ContentFrame.SourcePageType.FullName.ToString()));
        NavView.Header =
            ((NavigationViewItem)NavView.SelectedItem)?.Content?.ToString();
    }

    private void On_Navigated(object sender, NavigationEventArgs e)
    {
        NavView.IsBackEnabled = ContentFrame.CanGoBack;

        if (ContentFrame.SourcePageType == typeof(SettingsPage))
        {
            NavView.SelectedItem = (NavigationViewItem)NavView.SettingsItem;
            NavView.Header = "Settings";
        }
        else if (ContentFrame.SourcePageType != null)
        {
            NavView.SelectedItem = NavView.MenuItems
                .OfType<NavigationViewItem>()
                .First(i => i.Tag.Equals(ContentFrame.SourcePageType.FullName.ToString()));

            NavView.Header =
                ((NavigationViewItem)NavView.SelectedItem)?.Content?.ToString();
        }
    }
    
    private void OnPaneDisplayModeChanged(NavigationView sender, NavigationViewDisplayModeChangedEventArgs args)
    {
        if (sender.PaneDisplayMode == NavigationViewPaneDisplayMode.Top)
        {
            VisualStateManager.GoToState(this, "Top", true);
        }
        else
        {
            if (args.DisplayMode == NavigationViewDisplayMode.Minimal)
            {
                VisualStateManager.GoToState(this, "Compact", true);
            }
            else
            {
                VisualStateManager.GoToState(this, "Default", true);
            }
        }
    }
}