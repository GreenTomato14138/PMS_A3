import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { InventoryService, InventoryItem } from '../../services/inventory';
import { AddPage } from '../add/add.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ListPage implements OnInit {
  items: InventoryItem[] = [];
  filteredItems: InventoryItem[] = [];
  searchName: string = '';
  sortBy: string = 'name';

  constructor(
    private inventoryService: InventoryService,
    private alertController: AlertController,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.loadAllItems();
  }

  loadAllItems() {
    this.inventoryService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        this.applyFilterAndSort();
      },
      error: (err) => this.showAlert('Error', 'Failed to load items: ' + err.message)
    });
  }

  applyFilterAndSort() {
    let result = [...this.items];
    if (this.searchName.trim()) {
      result = result.filter(item => item.item_name.toLowerCase().includes(this.searchName.toLowerCase()));
    }
    switch (this.sortBy) {
      case 'name':
        result.sort((a, b) => a.item_name.localeCompare(b.item_name));
        break;
      case 'priceLowHigh':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighLow':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'quantity':
        result.sort((a, b) => a.quantity - b.quantity);
        break;
    }
    this.filteredItems = result;
  }

  searchItem() {
    this.applyFilterAndSort();
  }

  applySort() {
    this.applyFilterAndSort();
  }

  async openAddModal() {
    const modal = await this.modalController.create({
      component: AddPage,
      breakpoints: [0, 0.9],
      initialBreakpoint: 0.9,
      componentProps: { isEditMode: false }
    });
    modal.onDidDismiss().then((data) => {
      if (data.data && data.data.refresh) {
        this.loadAllItems();
      }
    });
    await modal.present();
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Electronics': return 'laptop-outline';
      case 'Furniture': return 'bed-outline';
      case 'Clothing': return 'shirt-outline';
      case 'Tools': return 'build-outline';
      case 'Miscellaneous': return 'apps-outline';
      default: return 'cube-outline';
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In stock': return 'success';
      case 'Low stock': return 'warning';
      case 'Out of stock': return 'danger';
      default: return 'medium';
    }
  }

  getQuantityPercent(quantity: number): number {
    const maxQuantity = 200;
    let percent = (quantity / maxQuantity) * 100;
    return Math.min(percent, 100);
  }

  getProgressColor(quantity: number): string {
    const percent = this.getQuantityPercent(quantity);
    if (percent < 26) return '#eb445a';
    if (percent < 56) return '#ffc409';
    return '#2dd36f';
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }

  showHelp() {
    this.showAlert('Help', 'This page shows all inventory items. You can search by name, sort by price/quantity, and add new items.');
  }
}